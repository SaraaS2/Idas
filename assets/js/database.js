import { database, storage } from "./firebase.js";
// as significa um apelido ou seja databaseref é o apelido de ref que é uma função do firebase
import { set, ref as databaseRef, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

document.addEventListener('DOMContentLoaded', () => {
    //derclarando as variaveis
    const formPost = document.querySelector('.form-post')
    const tituloPost = document.querySelector('.titulo-post')
    const imagemPost = document.querySelector('.imagem-post')
    const mensagemPost = document.querySelector('.mensagem-post')
    const dataPublicacaoPost = document.querySelector('.data-publicacao-post')
    const autorPost = document.querySelector('.autor-post')
    const sendPost = document.querySelector('.send-post')
    const divConteudos = document.querySelector('.conteudos')
    const gerenciadorConteudos = document.querySelector
    ('.gerenciador-conteudos')
    

    const postsRef = databaseRef(database, 'posts')

    if (sendPost && tituloPost && mensagemPost && dataPublicacaoPost && autorPost && imagemPost) {

        // grava as informações
        const enviarPost = (postId, titulo, mensagem, data, autor, imagemUrl) => {
            return set(databaseRef(database, `posts/${postId}`), {
                titulo,
                mensagem,
                data,
                autor,
                imagemUrl
            })
        }

        // envia os dados gravados
        sendPost.addEventListener('click', () => {
            const postId = new Date().getTime().toString() //um identificador baseado em milisegundos
            const titulo = tituloPost.value
            const mensagem = mensagemPost.value
            const data = dataPublicacaoPost.value
            const autor = autorPost.value
            const imagem = imagemPost.files[0]

            if (imagem) {

                const imagemRef = storageRef(storage, `posts/${postId}/${imagem.name}`)
                uploadBytes(imagemRef, imagem)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then((url) => {
                                enviarPost(postId, titulo, mensagem, data, autor, url)
                                    .then(() => {
                                        tituloPost.value = ''
                                        mensagemPost.value = ''
                                        dataPublicacaoPost.value = ''
                                        autorPost.value = ''
                                        imagemPost.value = ''
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            })
                    })
            }

        })
    }

    const listarPosts = (conteudos) => {
        onValue(postsRef, (snapshot) => {
            const posts = snapshot.val()
            if(divConteudos){
                divConteudos.innerHTML = ''
            }
            
            if (posts) {
                const postsIds = Object.keys(posts).sort((a,b)=>b-a)
                postsIds.forEach((postId) => {
                    const post = posts[postId]
                    const postElement = document.createElement('div')
                    const dataFormatada = new Date(post.data).toLocaleDateString('pt-BR')
                    postElement.innerHTML = `
                       <h2 class="mt-5 fw bold text-center">${post.titulo}</h2>
                       <div class="decoration-bar"></div>
                       <img src="${post.imagemUrl} alt="imagem de ${post.titulo}" class="img-blog d-block mx-auto
                       my-5 img-fluid" />
                       <p class="text-center">${post.mensagem.replace(/\n/g, '<br>')}</p>
                       <p class="aling-self-center mt-5 text-end">Publicado em: ${dataFormatada} - Por ${post.autor}.</p>
                       <hr/>
                    `
                    if(divConteudos){
                        divConteudos.appendChild(postElement)
                    }                   
                })
            } else {
                if(divConteudos){
                    divConteudos.innerHTML = '<p class="mt-5">Nenhum post encontrado.</p>'
                }
            }
        })
    }

    const gerenciarPosts = (conteudos) =>{
        onValue(postsRef,(snapshot)=>{
            const posts = snapshot.val()
            conteudos.innerHTML = ''
            if(posts){
                const postIds = Object.keys(posts).sort((a,b)=>b-a)
                postIds.forEach((postId)=>{
                    const post = posts[postId]
                    const postElement = document.createElement('div')
                    postElement.innerHTML=`
                        <button class="btn btn-danger btn-sm mx-3 delete-post" data-id="${postId}"><i class="bi bi-x-circle"></i>Apagar</button>
                        <span class="fw-bold" >${post.titulo}</span><hr>
                    `
                    conteudos.appendChild(postElement)
                })
                document.querySelectorAll('.delete-post').forEach((button)=>{
                    button.addEventListener('click',(e)=>{
                        const postId = e.target.getAttribute('data-id')
                        apagarPost(postId)
                    })
                })
            }else{
                conteudos.innerHTML = '<p class="mt-5" >Nenhum post encontrado.</p>'
            }
        })
    }

    const apagarPost = (postId)=>{
        remove(databaseRef(database,`posts/${postId}`))
           .then(()=>{
                alert('Post removido com sucesso')
                listarPosts(divConteudos)
                gerenciarPosts(gerenciadorConteudos)
                console.log(postId)
            })
            .catch((error)=>{
                console.log(`Erro ao tentar apagar o post ${error}`)
                alert('Erro ao tentar remover o post')
            })
    }

    if(divConteudos){
        listarPosts(divConteudos)
    }
    if(gerenciadorConteudos){
        gerenciarPosts(gerenciadorConteudos)
    }
})
