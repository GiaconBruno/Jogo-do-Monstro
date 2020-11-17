new Vue({
    el: "#app",
    data: {
        logado: false,
        nome: '',
        genero: 'o',
        classe: '',
        start: false,
        player: 100,
        monstro: 100,
        atkPlayer: [],
        curaPlayer: [],
        atkMonstro: [],
        stop: true,
        imgPlayer: '',
        statusPlayer: 'Battle',
        imgMonster: '',
        nameMonster: '',
        namesMonster: ['Drake', 'Esqueleto', 'Grifo', 'Senhor dos Orc', 'Lobo'],
        padding: '',
        paddings: ['60px 0', '73px 0px', '4px 0', '67px 0', '87px 0'],
    },
    computed: {
        hasResult() {
            return this.player == 0 || this.monstro == 0
        },
        playerHealth() {
            return {
                height: '100%',
                width: `${this.player}%`,
                backgroundColor: this.player > 20 ? 'green' : 'red',
                transition: 'all 0.3s'
            }
        },
        monstroHealth() {
            return {
                height: '100%',
                width: `${this.monstro}%`,
                backgroundColor: (this.monstro > 20) ? 'green' : 'red',
                transition: 'all 0.3s'
            }
        },
    },
    methods: {
        inicio() {
            this.player = 100
            this.atkPlayer = []
            this.monstro = 100
            this.atkMonstro = []
            this.curaPlayer = []
            this.stop = true
            this.dadosMonster()
            this.start = true
            this.imgPlayer = this.imgPlayer.replace('Die', 'Battle')
            this.imgPlayer = this.imgPlayer.replace('png', 'gif')
        },
        ataque(skill) {
            const plus = skill ? 6 : 0

            const danoPlayer = this.getRandom(3, 7 + plus)
            this.monstro = Math.max(this.monstro - danoPlayer, 0)
            this.atkPlayer.unshift(danoPlayer)

            let danoMonstro = this.getRandom(3, 10)
            if (this.monstro == 0) danoMonstro = 0
            this.player = Math.max(this.player - danoMonstro, 0)
            this.atkMonstro.unshift(danoMonstro)

            this.curaPlayer.unshift(0)
            // console.log(danoPlayer, danoMonstro);
        },
        heal() {
            const healPlayer = this.getRandom(5, 10)
            this.player = Math.min(this.player + healPlayer, 100)
            this.curaPlayer.unshift(healPlayer);

            const danoMonstro = this.getRandom(3, 10)
            this.player = Math.max(this.player - danoMonstro, 0)
            this.atkMonstro.unshift(danoMonstro)

            this.atkPlayer.unshift(0);
            // console.log(healPlayer, danoMonstro);
        },
        getRandom(min, max) {
            const damage = Math.random() * (max - min) + min
            return Math.round(damage)
        },
        auto() {
            this.stop = !this.stop;
            const timer = setInterval(() => {
                const play = this.getRandom(0, 30)
                // console.log('-> ', play)
                if ((!this.hasResult) && (this.stop == false)) {
                    if (play < 10) this.ataque()
                    else if ((play >= 10) && (play < 20)) this.ataque(true)
                    else this.heal()
                } else clearInterval(timer)
            }, 500);
        },
        dadosPlayer() {
            if (this.nome == '') this.nome = 'Jogador'
            if (this.classe == '') alert('Escolha uma classe!')
            else this.logado = true
            this.imgPlayer = `./media/${(this.classe != 'Caçadora') ? this.classe.replace(/a$/g, 'o') : this.classe.replace(/a$/g, '')}/${this.statusPlayer}-${(this.genero == 'o') ? "Man" : "Woman"}.gif`
            this.dadosMonster()
        },
        dadosMonster() {
            if (this.start == false) {
                const monster = this.getRandom(1, 5);
                this.imgMonster = `./media/Monster/${monster}.gif`;
                this.nameMonster = this.namesMonster[monster - 1]
                this.padding = this.paddings[monster - 1]
            }
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.start = false

            if (this.player == 0) {
                this.imgPlayer = this.imgPlayer.replace('Battle', 'Die')
                this.imgPlayer = this.imgPlayer.replace('gif', 'png')
            }
            if (this.monstro == 0) this.imgMonster = this.imgMonster.replace('.gif', '-die.png')
        },
    },
})