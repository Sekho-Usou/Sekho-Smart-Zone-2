const form      = document.getElementById('productForm');
const tbody     = document.querySelector('#prodTable tbody');
const editId    = document.getElementById('editId');
const formTitle = document.getElementById('formTitle');
const cancelBtn = document.getElementById('cancelEdit');
const msgBox    = document.getElementById('formMsg');
const progress  = document.getElementById('progress');
const progressBar= progress.querySelector('.progress-inner');
const progressTxt= progress.querySelector('.progress-text');
const quickSearch= document.getElementById('quickSearch');
let db = [];

/* ----------  AUTH  ---------- */
if (!sessionStorage.getItem('sekhoAdmin')) location = 'index.html';
document.getElementById('logout').onclick = () => { sessionStorage.clear(); location = 'index.html'; };

/* ----------  LOAD CATALOGUE  ---------- */
fetch('db.json')
  .then(r => r.json())
  .then(j => { db = j; render(); })
  .catch(() => flash('Could not load products','error'));

/* ----------  SAVE PRODUCT  ---------- */
form.onsubmit = async e => {
  e.preventDefault();
  flash('','');
  const id = editId.value || Date.now().toString();
  const mainFile = document.getElementById('mainPic').files[0];
  const extraFiles = [...document.getElementById('extraPics').files].slice(0,3);

  /* 1. upload images with progress */
  progress.style.display = 'block';
  let mainUrl, extraUrls = [];
  try{
    mainUrl  = mainFile ? await uploadFile(mainFile) : findById(id)?.img;
    for (const f of extraFiles) extraUrls.push(await uploadFile(f));
  }finally{
    progress.style.display = 'none';
    progressBar.style.width = '0%';
    progressTxt.textContent = '0%';
  }

  /* 2. build object */
  const prod = {
    id,
    name: form.name.value.trim(),
    cat:  form.cat.value,
    price:form.price.value,
    disc: form.discount.value.trim(),
    extra:form.extra.value.trim(),
    stock:form.stock.value,
    img:  mainUrl,
    imgs: extraUrls,
    url:  `https://wa.me/919862494804?text=I want to buy ${encodeURIComponent(form.name.value.trim())}`
  };

  /* 3. update local array instantly */
  const idx = db.findIndex(p => p.id === id);
  idx >= 0 ? db[idx] = prod : db.push(prod);

  /* 4. persist */
  await saveDB(prod);
  flash('Saved!','success');
  form.reset(); editId.value = ''; cancelBtn.style.display = 'none'; formTitle.textContent = 'Add Product';
  render();
};

/* ----------  IMAGE UPLOAD  ---------- */
async function uploadFile(file){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    const body = new FormData();
    body.append('file',file);

    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable){
        const pct = Math.round((e.loaded/e.total)*100);
        progressBar.style.width = pct + '%';
        progressTxt.textContent = pct + '%';
      }
    });
    xhr.onload = () => {
      if (xhr.status === 200){
        const j = JSON.parse(xhr.responseText);
        resolve(j.url);
      }else{
        reject(new Error('Upload failed'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.open('POST','upload.php');
    xhr.send(body);
  });
}

/* ----------  PERSIST DB  ---------- */
async function saveDB(prod){
  const r = await fetch('save.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(prod)
  });
  if (!r.ok) { flash('Save failed: '+r.statusText,'error'); throw new Error(r.statusText); }
}

/* ----------  RENDER TABLE  ---------- */
function render(){
  const filter = quickSearch.value.toLowerCase();
  const rows = db.filter(p => p.name.toLowerCase().includes(filter))
    .map(p => `
    <tr>
      <td><img src="${p.img}" alt=""></td>
      <td>${p.name}</td>
      <td>${p.cat}</td>
      <td>₹${p.price}</td>
      <td class="${p.stock==='out'?'stock-out':'stock-in'}">${p.stock}</td>
      <td>
        <button class="btn secondary" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn secondary" onclick="deleteProduct('${p.id}')">Del</button>
      </td>
    </tr>`).join('');
  tbody.innerHTML = rows || '<tr><td colspan="6">No products</td></tr>';
  document.getElementById('count').textContent = db.length;
}
quickSearch.oninput = render;

/* ----------  EDIT  ---------- */
window.editProduct = id => {
  const p = findById(id);
  for (const key of ['name','cat','price','discount','extra','stock'])
    document.getElementById(key).value = p[key]||'';
  editId.value = id;
  formTitle.textContent = 'Edit Product';
  cancelBtn.style.display = 'inline-block';
  window.scrollTo({top:0,behavior:'smooth'});
};
cancelBtn.onclick = () => {
  form.reset(); editId.value = ''; cancelBtn.style.display = 'none'; formTitle.textContent = 'Add Product';
};

/* ----------  DELETE  ---------- */
window.deleteProduct = async id => {
  if (!confirm('Delete this product?')) return;
  db = db.filter(p => p.id !== id);
  await fetch('save.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(db)
  });
  render();
};

/* ----------  UTIL  ---------- */
function findById(id){ return db.find(p => p.id === id); }
function flash(txt,type){
  msgBox.textContent = txt;
  msgBox.className   = 'msg ' + type;
}

