let boneco = document.querySelector("#boneco")
let tela = document.querySelector("#tela_1")
let plataformas = document.querySelectorAll(".plataformas")

let inimigos = document.querySelectorAll(".inimigos")
let velocidade_inimigo = 2
let direcao_inimigo = 1

let velocidade_x = 0
let velocidade_y = 0
let gravidade = 1
let velocidadeMAX = 20
let noChao = false
let tamanho_pulo = -25
let ricochete = -18
let movimento_distancia = 5

let teclas_pressionadas = {}



window.addEventListener("keydown", (event) => {
    teclas_pressionadas[event.key] = true
})

window.addEventListener("keyup", (event) => {
    teclas_pressionadas[event.key] = false
})

//contador de tempo para alterar a direção do inimigo
setInterval(() => {
    direcao_inimigo *= -1; 
}, 4000);  

function interacoes(){

    //movimentação do player
    let boneco_pos = boneco.getBoundingClientRect()
    let tela_pos = tela.getBoundingClientRect()
    
    if (teclas_pressionadas["ArrowLeft"] && boneco_pos.left >tela_pos.left){
        velocidade_x = -movimento_distancia
    }
    else if (teclas_pressionadas["ArrowRight"] && boneco_pos.right < tela_pos.right){
        velocidade_x = movimento_distancia
    }
    else{
        velocidade_x = 0
    }

    if (teclas_pressionadas["ArrowUp"] && noChao){
        velocidade_y = tamanho_pulo
        noChao = false

    }

    if (!noChao){
        velocidade_y += gravidade
        if (velocidade_y> velocidadeMAX){
            velocidade_y = velocidadeMAX
        }
    }

    let novaPosX = boneco.offsetLeft + velocidade_x
    let novaPosY = boneco.offsetTop + velocidade_y

    if (novaPosX<0) {
        novaPosX = 0
    }

    if (novaPosX + boneco.offsetWidth > tela.offsetWidth){
        novaPosX = tela.offsetWidth - boneco.offsetWidth
    }


    //colisão com plataformas
    noChao=false
    plataformas.forEach((plataformas) => {
        let plataformas_pos = plataformas.getBoundingClientRect()
        if (
            boneco_pos.bottom + velocidade_y >= plataformas_pos.top &&
            boneco_pos.top < plataformas_pos.top &&
            boneco_pos.right > plataformas_pos.left &&
            boneco_pos.left < plataformas_pos.right
        )
            
            {
            novaPosY = plataformas_pos.top - boneco.offsetHeight/1.1
            noChao = true
            velocidade_y=0
            }

        if (
            velocidade_y <0 &&
            boneco_pos.top + velocidade_y <= plataformas_pos.bottom &&
            boneco_pos.bottom > plataformas_pos.bottom &&
            boneco_pos.right > plataformas_pos.left &&
            boneco_pos.left < plataformas_pos.right
        )
            
            {
            novaPosY = plataformas_pos.bottom
            velocidade_y=0

            }

        if(boneco_pos.right +velocidade_x >= plataformas_pos.left&&
            boneco_pos.bottom > plataformas_pos.top +8&&
            boneco_pos.top < plataformas_pos.bottom -8&&
            boneco.offsetLeft+boneco.offsetWidth <= plataformas_pos.left
        ){
            novaPosX = plataformas_pos.left- (boneco_pos.right - boneco_pos.left)
            velocidade_x =0

        }

        if(boneco_pos.left +velocidade_x <= plataformas_pos.right&&
            boneco_pos.bottom > plataformas_pos.top+8&&
            boneco_pos.top < plataformas_pos.bottom -8&&
            boneco.offsetLeft >= plataformas_pos.right
        ){
            novaPosX = plataformas_pos.right
            velocidade_x =0

        }
    
    })

    //interações com inimigos
    inimigos.forEach((inimigos)=> {
        let inimigos_pos = inimigos.getBoundingClientRect()
        if (
            boneco_pos.bottom + velocidade_y >= inimigos_pos.top &&
            boneco_pos.top < inimigos_pos.top &&
            boneco_pos.right > inimigos_pos.left &&
            boneco_pos.left < inimigos_pos.right
        ){
            inimigos.style.display = "none"
            velocidade_y = ricochete
            novaPosY = inimigos_pos.top-100

        }

        if(boneco_pos.right +velocidade_x >= inimigos_pos.left&&
            boneco_pos.bottom > inimigos_pos.top &&
            boneco_pos.top < inimigos_pos.bottom &&
            boneco.offsetLeft+boneco.offsetWidth <= inimigos_pos.left
        ){
            //novaPosX = inimigos_pos.left- (boneco_pos.right - boneco_pos.left)-200  
            velocidade_x =0
            direcao_inimigo *= -1

        }

        if(boneco_pos.left +velocidade_x <= inimigos_pos.right&&
            boneco_pos.bottom > inimigos_pos.top &&
            boneco_pos.top < inimigos_pos.bottom &&
            boneco.offsetLeft >= inimigos_pos.right
        ){
            //novaPosX = inimigos_pos.right+100
            direcao_inimigo *= -1
            velocidade_x =0
        }

        let novaPosX = inimigos.offsetLeft + velocidade_inimigo * direcao_inimigo
        inimigos.style.left = novaPosX + "px"

    })

    if (novaPosY + boneco.offsetHeight > tela.offsetHeight){
        novaPosY = tela.offsetHeight - boneco.offsetHeight
        noChao = true
        velocidade_y = 0
    }

    

    boneco.style.left = novaPosX + "px";
    boneco.style.top = novaPosY + "px";

    requestAnimationFrame(interacoes)
}

interacoes()