/*
1.Render song
2.Scroll topic
3.Play pause next 
4.Cd rotated
5.nex/prev
6.random 
7. next repeat when ended
8.active song
9. scroll activesong into view
10.playsong when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const PLAYER_STORAGE_KEY = 'F8-Player'

const app = {
    currentIndex : 0,
    isPlaying:false,
    isRandom : false,
    isRepeat : false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },

    songs: [
        {
          name: 'Nevada',
          singer: 'Vicetone',
          path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
          image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
          name: 'Light It Up',
          singer: 'Robin Hustin x TobiMorrow',
          path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
          image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
        },
        {
          name: 'Yoru ni kakeru',
          singer: 'YOASOBI',
          path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
          image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
        },
        {
          name: 'Muộn rồi mà sao còn',
          singer: 'Sơn Tùng M-TP',
          path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
          image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
          name: 'See You Again',
          singer: 'Charlie Puth ft Wiz Khalifa',
          path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
          image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
       
        {
          name: 'Symphony',
          singer: 'Clean Bandit',
          path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
          image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
          name: 'Waiting For Love',
          singer: 'Avicii',
          path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
          image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
          name: 'Alone',
          singer: 'Marshmello',
          path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
          image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
          name: 'Something Just Like This',
          singer: 'The Chainsmokers & Coldplay',
          path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
          image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
          name: 'Sugar',
          singer: 'Maroon 5',
          path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
          image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },
      ],
    handleEvent: function () {
        const _this=this;

        //Xử lý cd quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations:Infinity
        })
        
       


        //Xử lý phóng to thu nhỏ
        const cdWidth = cd.offsetWidth
        console.log(cdWidth)
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            console.log(scrollTop)
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ?newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth /cdWidth 
        }

        //Xử lý dừng/ phát bài nhạc
        playBtn.onclick = function () {
            if(app.isPlaying){
                audio.pause()
            }
            else {
                audio.play()
            }         
        }
        audio.onplaying = function () {
            app.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //Xử lý tua bài nhạc
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = audio.currentTime/audio.duration*100
                progress.value = progressPercent
            }
        }

        progress.oninput = function(e) {
            const seekTime = e.target.value /100 * audio.duration;
            audio.currentTime = seekTime;
        }
        //Khi next song

        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.playRandomSong();
            }
            else {
                app.nextSong();
            }
            app.scrollToActiveSong()
            
            audio.play()
            
            
        }
        prevBtn.onclick = function() {
            if(app.isRandom){
                app.playRandomSong()
            }
            else {
                app.prevSong()
            }
            app.scrollToActiveSong()
            audio.play()
            
            

        }
        //Random 
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
            
        
        }
        audio.onended = function() {
            if(app.isRepeat) {
                audio.load()
            } 
            else {
                nextBtn.click();
            }
        }
        // Xử lý phát lại 1 bài hát khi kết thúc
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active',_this.isRepeat)
            _this.setConfig('isRepeat',_this.isRepeat)
        }
        //Tao hieu ung chuyen
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if( !e.target.closest('.option')){
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    console.log(typeof songNode.dataset.index)
                    audio.play();
                    _this.loadCurrentSong();
                    
                }
            }
           
        }

    },
    //Xử lý hiển thị
    render: function () {
        htmls = this.songs.map(function(song,index) {
            return `
            <div class=" song ${index === app.currentIndex ? 'active' : ''}" data-index = ${index}>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    //Tạo mới thuộc tính
    defineProperties: function () {
        Object.defineProperty(this,'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
        
    },
    //Sroll to active song
    scrollToActiveSong: function () {
        setTimeout(function () {
            
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'end'
                })
            
        },300)
        },
    //Load bài hát đầu tiên
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    
        if ($('.song.active')) {
          $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
          if (Number(song.getAttribute('data-index')) === this.currentIndex) {
            song.classList.add('active');
          }
        });
      },
    //Next bài hát
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    //Prev
    prevSong : function () {
        this.currentIndex--
        if(this.currentIndex<0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    //Random
    playRandomSong: function () {
        var newIndex = Math.floor(Math.random()*this.songs.length)
        do {
            newIndex = Math.floor(Math.random()*this.songs.length)
        } while(newIndex === this.currentIndex )
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    }
,
    loadConfig : function () {
        this.isRandom = this.config.isRandom,
        this.isRepeat = this.config.isRepeat
    },


    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();
        randomBtn.classList.toggle('active',app.isRandom)
        repeatBtn.classList.toggle('active',app.isRepeat)
        
    },
   

}
app.start()