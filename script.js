const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('show');
}
});
},{threshold:0.2});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('openBtn').addEventListener('click', ()=>{
document.querySelector('.section').scrollIntoView({behavior:'smooth'});
});

document.getElementById('whatsappBtn').addEventListener('click', ()=>{
const message = encodeURIComponent('Happy Friendship Day! I made this little scrapbook for you 💖');
window.open(`https://wa.me/?text=${message}`, '_blank');
});

document.getElementById('copyBtn').addEventListener('click', async ()=>{
try{
await navigator.clipboard.writeText(window.location.href);
alert('Link copied! Share it with your favorite people 🩷');
}catch(e){
alert('Open this on a hosted website to share the link.');
}
});
