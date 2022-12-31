function renderJobs(){
    const jobList = document.getElementById('job-list')

    jobsData.forEach(job => {
        const vaga = createCardJobs(job)

        jobList.append(vaga)
    });
}

function createCardJobs(job){

    const {id, title, enterprise, location, descrition, modalities} = job

    const tagLi = document.createElement('li')
    const titleJob = document.createElement('h2')
    const enterpriseJog = document.createElement('span')
    const locationJob = document.createElement('span')
    const descritionJob = document.createElement('p')
    const modalitiesJob = document.createElement('p')
    const modalitieJob = document.createElement('p')
    const btnJob = document.createElement('button')

    tagLi.classList = "container container__section--card"

    titleJob.classList ="main__text main__text--title" 
    titleJob.innerText = title

    enterpriseJog.classList = "main__text main__text--small"
    enterpriseJog.innerText = enterprise

    locationJob.classList = "main__text main__text--small"
    locationJob.innerText = location

    descritionJob.classList = "main__text"
    descritionJob.innerText = descrition

    modalitiesJob.classList = "main__text main__text--small section__tag"
    modalitiesJob.innerText = modalities[0]

    modalitieJob.classList = "main__text main__text--small section__tag"
    modalitieJob.innerText = modalities[1]

    btnJob.classList = "button__brand button__brand--section"
    btnJob.innerText = 'Candidatar'
    btnJob.dataset.id = id
    btnJob.id = "botao_candidatar_" + id
    btnJob.addEventListener('click', ()=>{
        addEndRemove(btnJob, job)
    })

    tagLi.append(titleJob, enterpriseJog, locationJob, descritionJob,modalitiesJob, modalitieJob, btnJob)

    return tagLi

}

function renderJobsAside(){
    const asideList = document.getElementById("aside-vagas")

    asideList.innerHTML = ''

    vagasData.forEach(job => {
        const vaga = createCardJobsAside(job)

        asideList.append(vaga)
    });
}

function createCardJobsAside(job) {

    const {id, title, enterprise, location} = job

    const tagLiAside = document.createElement('li')
    const cardContainerAside = document.createElement('div')
    const titleJobAside = document.createElement('h2')
    const enterpriseJogAside = document.createElement('span')
    const locationJobAside = document.createElement('span')
    const btnJobAside = document.createElement('button')
    const imgBtn = document.createElement('img')

    tagLiAside.classList = "container__cards--vagas"
    tagLiAside.id = id

    cardContainerAside.classList = "card__vagas"

    titleJobAside.classList ="main__text main__text--title" 
    titleJobAside.innerText = title

    enterpriseJogAside.classList = "main__text main__text--small"
    enterpriseJogAside.innerText = enterprise

    locationJobAside.classList = "main__text main__text--small"
    locationJobAside.innerText = location

    btnJobAside.classList = "aside__button--trash"
    btnJobAside.addEventListener('click', ()=>{
        tagLiAside.remove()
        removeVagasData(job)
        setNameBtnExit(job.id)
    }

    )

    imgBtn.classList ="aside__button--img"
    imgBtn.src = "./src/assets/img/ButtonTrash.svg"

    btnJobAside.append(imgBtn)
    cardContainerAside.append(titleJobAside, enterpriseJogAside, locationJobAside)
    tagLiAside.append(cardContainerAside, btnJobAside)

    return tagLiAside
    
}

function addEndRemove(btnJob, job){

    const vaga = document.getElementById(btnJob.dataset["id"])
    let verifica = (btnJob.innerText == "Candidatar")

       if(verifica){
            vagasData.push(job)
            setStorage( "vagas", vagasData)
            renderJobsAside()
            btnJob.innerText = "Remover Candidatura"
        }else{
            
            vaga.remove()
            removeVagasData(job)
            btnJob.innerText = "Candidatar"
        }
}

function removeVagasData(job){

    let findJob = vagasData.findIndex(vaga => vaga.id == job.id)

    vagasData.splice(findJob,1)

    setStorage( "vagas", vagasData)

}

function setStorage( chave, valor){
    const vagaJson = JSON.stringify(valor)
    localStorage.setItem(chave, vagaJson)
}

function getStorage(){

    const vagasLocalStorage = localStorage.getItem('vagas') || []
  
        vagasData = JSON.parse(vagasLocalStorage)

        renderJobsAside(vagasData)
        setNameBtn()
}

function setNameBtn() {
    vagasData.forEach(element => {
        const btnVaga = document.getElementById("botao_candidatar_" + element.id)
        btnVaga.innerText = "Remover Candidatura"
    });
}

function setNameBtnExit(id){
    const btnVaga = document.getElementById("botao_candidatar_" + id)
    btnVaga.innerText = "Candidatar"
}

renderJobs()
getStorage()
