async function loadCv(){
  const response = await fetch("data/cv.json");
  if(!response.ok) throw new Error("Não foi possível carregar data/cv.json");
  return response.json();
}
const byId = (id) => document.getElementById(id);
const safe = (value, fallback="") => value || fallback;
const dateBR = (value) => {
  if(!value) return "";
  const [year,month,day] = value.split("-");
  return `${month}/${year}`;
};
function addTextLink(container, label, value, href){
  if(!value) return;
  const el = document.createElement(href ? "a" : "span");
  el.textContent = label ? `${label}: ${value}` : value;
  if(href){ el.href = href; if(href.startsWith("http")){el.target="_blank";el.rel="noopener noreferrer";} }
  container.appendChild(el);
}
function addEntry(container, title, meta, description){
  const article=document.createElement("article"); article.className="entry";
  const h=document.createElement("h3"); h.textContent=title; article.appendChild(h);
  if(meta){const m=document.createElement("div");m.className="meta";m.textContent=meta;article.appendChild(m);}
  if(description){const p=document.createElement("p");p.textContent=description;article.appendChild(p);}
  container.appendChild(article);
}
function addTags(container, values){
  (values||[]).forEach(value=>{const span=document.createElement("span");span.className="tag";span.textContent=value;container.appendChild(span);});
}
function render(data){
  const cv=data.cv, person=cv.personalInformation, summary=cv.professionalSummary;
  byId("name").textContent=person.fullName;
  byId("title").textContent=person.professionalTitle;
  byId("summary").textContent=summary.description;
  byId("footerName").textContent=person.fullName;
  byId("footerLocation").textContent=`${person.location.city}, ${person.location.state}`;
  if(person.profilePhoto) byId("portrait").src=person.profilePhoto;
  const contact=byId("contact");
  addTextLink(contact,"E-mail",person.email,`mailto:${person.email}`);
  addTextLink(contact,"Telefone",person.phone,`tel:${person.phone}`);
  addTextLink(contact,"Localização",`${person.location.city} - ${person.location.state}`);
  if(person.linkedin) addTextLink(contact,"LinkedIn",person.linkedin,person.linkedin);

  const exp=byId("experienceList");
  cv.professionalExperience.forEach(item=>{
    const period=[dateBR(item.startDate),item.current?"Atual":dateBR(item.endDate)].filter(Boolean).join(" – ");
    addEntry(exp,item.position && item.position!=="Cargo não informado"?`${item.position} · ${item.company}`:item.company,period,item.description);
    if(item.responsibilities?.length){const p=document.createElement("p");p.textContent=item.responsibilities.join(" • ");exp.lastElementChild.appendChild(p);}
  });
  const edu=byId("educationList");
  cv.education.forEach(item=>addEntry(edu,`${item.fieldOfStudy} · ${item.institution}`,item.current?"Em andamento":[dateBR(item.startDate),dateBR(item.endDate)].filter(Boolean).join(" – "),item.description));
  const skills=byId("skillsList");
  [["Conhecimentos técnicos",cv.skills.technical.map(s=>`${s.name} (${s.level})`)],["Habilidades comportamentais",cv.skills.behavioral],["Ferramentas",cv.skills.tools]].forEach(([heading,items])=>{
    if(!items?.length)return;const group=document.createElement("div");group.className="skill-group";
    const h=document.createElement("h3");h.textContent=heading;group.appendChild(h);
    const ul=document.createElement("ul");items.forEach(item=>{const li=document.createElement("li");li.textContent=item;ul.appendChild(li);});group.appendChild(ul);skills.appendChild(group);
  });
  const langs=byId("languagesList");
  cv.languages.forEach(item=>{const row=document.createElement("div");row.className="language";const a=document.createElement("span"),b=document.createElement("strong");a.textContent=item.name;b.textContent=item.proficiency;row.append(a,b);langs.appendChild(row);});
  byId("objective").textContent=summary.careerObjective;
  addTags(byId("interestsList"),cv.preferences.targetPositions);
}
loadCv().then(render).catch(error=>{console.error(error);byId("summary").textContent="Erro ao carregar os dados. Abra o projeto por um servidor local ou GitHub Pages.";});
byId("printCv").addEventListener("click",()=>window.print());
byId("downloadJson").addEventListener("click",async()=>{
  const response=await fetch("data/cv.json");const text=await response.text();
  const blob=new Blob([text],{type:"application/json"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");
  a.href=url;a.download="curriculo-joao-pedro.json";a.click();URL.revokeObjectURL(url);
});
