//wybiera element canvas z dokumentu i kontekst do rysowania 2d
const grapole = document.querySelector('canvas');
const canvas = grapole.getContext('2d');

//ładuje grafiki do obiektów Image
const obraz = new Image();
const obrazTOP = new Image();
const postacie = new Image();
const postacie2 = new Image();
const serca = new Image();
const obrazGora = new Image();
const obrazDol = new Image();
const obrazLewe = new Image();
const obrazPrawe = new Image();
const moby = new Image();

moby.src = './img/game/Mobs/Mele.png';

//ustawia wymiary canvasa
grapole.width = 960;
grapole.height = 700;

//tworzy obiekt do wysyłania zapytań AJAX
var xmlhttp = new XMLHttpRequest();
var url = "pobieranieDanychMySQL.php";

var nickname;

//ustawia funkcję, która zostanie wywołana, gdy dane zostaną pobrane
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    nickname = this.responseText;
  }
};

//ustawia funkcję, która zostanie wywołana, gdy dane zostaną pobrane
xmlhttp.open("GET", url, true);
xmlhttp.send();

//stałe i zmienne wykorzystywane w grze
dlugoscMapy = 15;
sekunda = 0;
czas = 0;

var tlo;
var tloTOP;
let ruch;
var graniczne = [];
var teleportujace = [];
var typPokuju = 0;
var gora_Kontent;
var dol_Kontent;
var lewe_Kontent;
var praw_Kontent;
var fast_map;
var testmob=[];

class moby_i_inne_potwory { // Konstruktor dla obiektu Odswiezenie, który określa pozycję, prędkość, obraz oraz ramkę.
    constructor({pozycja, predkosc, obraz, ramka = { max: 1 },nr_line}){ // Przypisanie wartości pozycji, obrazu i ramki do odpowiadających właściwości.
        this.pozycja = pozycja;
        this.obraz = obraz;
        this.ramka = {...ramka, wartosc: 0, stracony: 0};
        this.nr_line = nr_line;
        this.predkosc = predkosc;
        if(this.nr_line<5){
            this.f_height = 64;
            this.f_nr_line = this.nr_line*64;
            this.pozycja.y += 64;
        }else{
            this.f_height = 64*2;
            this.f_nr_line = 64*3+(this.nr_line-4)*64*2;
        }
        this.width = this.obraz.width / this.ramka.max;
        this.height = this.f_height; 
        // Ustawienie wartości początkowych dla właściwości ruch oraz animacjapostaci.
        this.ruch = false;
        this.animacjapostaci = this.animacjapostaci;
    }
    // Metoda rysowania postaci na canvasie.
    draw(){
        // Rysowanie obrazu na canvasie w określonych parametrach.
        canvas.drawImage(this.obraz, 
                         this.ramka.wartosc * this.width,
                         this.f_nr_line,
                         //0,
                         this.obraz.width/this.ramka.max,
                         this.f_height,
                         this.pozycja.x,
                         this.pozycja.y,  
                         this.obraz.width/this.ramka.max,
                         this.f_height);
        
        // Rysowanie obrazu na canvasie w określonych parametrach.
        if (this.ruch) {
            // Jeśli ramka ma więcej niż jedną klatkę, zwiększa wartość straconych klatek.
            if (this.ramka.max>1){
                this.ramka.stracony++
            }
            // Jeśli wartość straconych klatek jest podzielna przez 10, zmienia klatkę w ramce na kolejną lub ustawia ją na początkową.
            if(this.ramka.stracony%this.predkosc === 0){
                if (this.ramka.wartosc<this.ramka.max-1) {
                this.ramka.wartosc++;
                }else{
                this.ramka.wartosc=0;
                }
            }
        }
        // Jeśli postać się nie porusza, ustawia klatkę na początkową.
        else{
            this.ramka.wartosc=0;
        }
    }
}

function createMapS(ogolne_x, ogolne_y) {
    const mapakolizji = [];
    graniczne = [];
    this.ogolne = {
        x: ogolne_x,
        y: ogolne_y
    }

    //klasa Granica definiująca obiekty granicy planszy
    class Granica {
        static width =64;
        static height =64;
        constructor({pozycja}){
            this.pozycja = pozycja;
            this.width = 64;
            this.height = 64;
        }
        draw(){
        }
    }

    //tworzy tablicę z obiektami granic planszy na podstawie tablicy kolizji
    for(let i = 0; i<kolizje.length; i +=dlugoscMapy){
        mapakolizji.push(kolizje.slice(i, dlugoscMapy+i));
    }

    mapakolizji.forEach((row, i) => {
        row.forEach((znak, j) => {
            if (znak ===1281)
            graniczne.push(new Granica({pozycja: {
                x: j*Granica.width + ogolne.x,
                y: i*Granica.height + ogolne.y
            }}))
        })
    })

    const mapateleportu = [];
    teleportujace = [];

    //klasa Teleport definiująca obiekty teleportu
    class Teleport {
        static width =64;
        static height =64;
        constructor({pozycja}){
            this.pozycja = pozycja;
            this.width = 64;
            this.height = 64;
        }
        draw(){
        }
    }

    //tworzy tablicę z obiektami teleportu planszy na podstawie tablicy teleportu
    for(let i = 0; i<teleport.length; i +=dlugoscMapy){
        mapateleportu.push(teleport.slice(i, dlugoscMapy+i));
    }

    mapateleportu.forEach((row, i) => {
        row.forEach((znak, j) => {
            if (znak ===1282)
            teleportujace.push(new Teleport({pozycja: {
                x: j*Teleport.width + ogolne.x,
                y: i*Teleport.height + ogolne.y
            }}))
        })
    })

    // Ładujemy obrazy do gry
    obraz.src = './img/game/Type_'+typPokuju+'/pokoj.png';
    obrazTOP.src = './img/game/Type_'+typPokuju+'/gora.png';

    this.pozycja = {x: aktualne_pole_mapy.x, y: aktualne_pole_mapy.y};
    for(const klucz of mapa.keys()) {
        if(klucz.x === this.pozycja.x && klucz.y === this.pozycja.y) {
            this.map = mapa.get(klucz);
            break;
        }
    }

    if(this.map.nr_pokoju !== 4) {
        if(this.map.drzwi_gorne === 1 && czas==0){
            obrazGora.src = './img/game/Type_'+typPokuju+'/Drzwi_gora.png'
        }else{
            obrazGora.src = './img/game/Type_'+typPokuju+'/Sciana_gora.png'
        }

        if(this.map.drzwi_dolne === 1 && czas==0){
            obrazDol.src = './img/game/Type_'+typPokuju+'/Drzwi_dol.png'
        }else{
            obrazDol.src = './img/game/Type_'+typPokuju+'/Sciana_dol.png'
        }

        if(this.map.drzwi_lewe === 1 && czas==0){
            obrazLewe.src = './img/game/Type_'+typPokuju+'/Drzwi_lewe.png'
        }else{
            obrazLewe.src = './img/game/Type_'+typPokuju+'/Sciana_lewe.png'
        }

        if(this.map.drzwi_prawe === 1 && czas==0){
            obrazPrawe.src = './img/game/Type_'+typPokuju+'/Drzwi_prawe.png'
        }else{
            obrazPrawe.src = './img/game/Type_'+typPokuju+'/Sciana_prawe.png'
        }
    }
    
    gora_Kontent = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obrazGora,
    })

    dol_Kontent = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obrazDol,
    })

    lewo_Kontent = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obrazLewe,
    })

    prawe_Kontent = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obrazPrawe,
    })

    // Tworzenie obiektu klasy Odswiezenie reprezentującego postać gracza
    tlo = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obraz,
    })

    // Tworzenie obiektu klasy Odswiezenie reprezentującego górną część tła gry
    tloTOP = new Odswiezenie({
        pozycja: {
            x: ogolne.x,
            y: ogolne.y
        },
        obraz: obrazTOP,
    })

    // Tworzenie tablicy obiektów klasy Odswiezenie reprezentujących granice planszy
    if(this.map.nr_pokoju !== 4) {
        ruch = [tlo, tloTOP, gora_Kontent, dol_Kontent, lewo_Kontent, prawe_Kontent, ...graniczne, ...teleportujace]
    }else {
        ruch = [tlo, tloTOP, ...graniczne, ...teleportujace]
    }

    if(this.map.moby===null){
        spawn_potworow_i_innych();
    }
    if(this.map.nr_pokoju !==0){
        const pomoc_fast=mapa.get(fast_map);
        for(let i=0; i<pomoc_fast.ilosc_mobow; i++){
            console.log((pomoc_fast.moby[i].numer_id%dlugoscMapy),Math.floor(pomoc_fast.moby[i].numer_id/dlugoscMapy));
            console.log(-(pomoc_fast.moby[i].numer_id%dlugoscMapy)*64+obraz.width/2);
            testmob[i] =new moby_i_inne_potwory({
            pozycja: {
                x: -((dlugoscMapy-1-(pomoc_fast.moby[i].numer_id%dlugoscMapy))*64-16-obraz.width/2),
                y: (Math.floor(pomoc_fast.moby[i].numer_id/dlugoscMapy)*64-16-obraz.height/2)
            },
            obraz: moby,
            ramka: {
                max:8
            },
            /*animacjapostaci: {
                prawo: postacie,
                lewo: postacie2
            }*/
            predkosc: 10,
            nr_line: i
            })}
        for(let i=0; i<pomoc_fast.ilosc_mobow; i++){
            ruch.push(testmob[i]);
        }
    }
}

postacie.src = './img/game/postac.png';
postacie2.src = './img/game/postac2.png';
serca.src = './img/game/serca.png';

// Tworzymy klasę SercaGenerator, która będzie odpowiedzialna za generowanie serduszek w grze
class SercaGenerator {
    constructor({maxIlosc, aktualnaIlosc, aktualnaIloscMax, obraz}){ // Przyjmujemy parametry, które będą wykorzystane wewnątrz klasy
        this.maxIlosc = maxIlosc;
        this.aktualnaIlosc = aktualnaIlosc;
        this.aktualnaIloscMax = aktualnaIloscMax;
        this.ilosc = 0;
        this.obraz = obraz;
        this.obraz.onload = () => { // Przyjmujemy parametry, które będą wykorzystane wewnątrz klasy
            this.width = this.obraz.width / 3;
            this.height = this.obraz.height;
        }
    }
    draw(){ // Funkcja, która rysuje serduszka
        if(this.aktualnaIlosc%2===0){ // Funkcja, która rysuje serduszka
            for(let i =0; i<(this.aktualnaIlosc/2); i++){ // Rysujemy połowę serduszek na lewo od postaci
                canvas.drawImage(this.obraz,
                                 0 * this.width,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height,
                                 this.ilosc*64,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height);
                this.ilosc++;
            }
            for(let i =0; i<((this.aktualnaIloscMax-this.aktualnaIlosc)/2); i++){ // Rysujemy drugą połowę serduszek na prawo od postaci
                canvas.drawImage(this.obraz,
                                 2 * this.width,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height,
                                 this.ilosc*64,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height);
                this.ilosc++;
            }
        }
        else{   // Rysujemy drugą połowę serduszek na prawo od postaci
            for(let i =0; i<((this.aktualnaIlosc-1)/2); i++){    // Rysujemy połowę serduszek na lewo od postaci
                canvas.drawImage(this.obraz,
                                 0 * this.width,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height,
                                 this.ilosc*64,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height);
                this.ilosc++;
            }
            canvas.drawImage(this.obraz,    // Rysujemy środkowe serduszko w połowie planszy
                             1 * this.width,
                             0,
                             this.obraz.width/3,
                             this.obraz.height,
                             this.ilosc*64,
                             0,
                             this.obraz.width/3,
                             this.obraz.height);
            this.ilosc++;
            for(let i =0; i<((this.aktualnaIloscMax-this.aktualnaIlosc-1)/2); i++){
                canvas.drawImage(this.obraz,
                                 2 * this.width,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height,
                                 this.ilosc*64,
                                 0,
                                 this.obraz.width/3,
                                 this.obraz.height);
                this.ilosc++;
            }
        }
        // Po zakończeniu pętli ilość rysowanych serduszek zostaje wyzerowana
        this.ilosc=0;
    }
}

// Tworzenie obiektu SercaGenerator z określoną maksymalną ilością serc, aktualną 
const serduszka = new SercaGenerator({
    maxIlosc: 10,
    aktualnaIlosc: 8,
    aktualnaIloscMax: 8,
    obraz: serca
})

class Odswiezenie { // Konstruktor dla obiektu Odswiezenie, który określa pozycję, prędkość, obraz oraz ramkę.
    constructor({pozycja, predkosc, obraz, ramka = { max: 1 }}){ // Przypisanie wartości pozycji, obrazu i ramki do odpowiadających właściwości.
        this.pozycja = pozycja;
        this.obraz = obraz;
        this.ramka = {...ramka, wartosc: 0, stracony: 0};

        // Gdy obraz załaduje, ustawia szerokość i wysokość na podstawie liczby klatek w ramce.
        this.obraz.onload = () => {
            this.width = this.obraz.width / this.ramka.max;
            this.height = this.obraz.height;
        }
        // Ustawienie wartości początkowych dla właściwości ruch oraz animacjapostaci.
        this.ruch = false;
        this.animacjapostaci = this.animacjapostaci;
    }
    // Metoda rysowania postaci na canvasie.
    draw(){
        // Rysowanie obrazu na canvasie w określonych parametrach.
        canvas.drawImage(this.obraz, 
                         this.ramka.wartosc * this.width,
                         0,
                         this.obraz.width/this.ramka.max,
                         this.obraz.height,
                         this.pozycja.x,
                         this.pozycja.y,  
                         this.obraz.width/this.ramka.max,
                         this.obraz.height);
        
        // Rysowanie obrazu na canvasie w określonych parametrach.
        if (this.ruch) {
            // Jeśli ramka ma więcej niż jedną klatkę, zwiększa wartość straconych klatek.
            if (this.ramka.max>1){
                this.ramka.stracony++
            }
            // Jeśli wartość straconych klatek jest podzielna przez 10, zmienia klatkę w ramce na kolejną lub ustawia ją na początkową.
            if(this.ramka.stracony%10 === 0){
                if (this.ramka.wartosc<this.ramka.max-1) {
                this.ramka.wartosc++;
                }else{
                this.ramka.wartosc=0;
                }
            }
        }
        // Jeśli postać się nie porusza, ustawia klatkę na początkową.
        else{
            this.ramka.wartosc=0;
        }
    }
}
createMapS(-20,-70);
// Tworzenie obiektu klasy Odswiezenie reprezentującego postać gracza
const postacGry = new Odswiezenie({
    pozycja: {
        x: grapole.width/2 - 512 / 6 / 2,
        y: grapole.height/2 - 128 / 2
    },
    obraz: postacie,
    ramka: {
        max:8
    },
    animacjapostaci: {
        prawo: postacie,
        lewo: postacie2
    }
})

const przyciski = {
    w: {
        press: false
    },
    s: {
        press: false
    },
    a: {
        press: false
    },
    d: {
        press: false
    },
}

// Funkcja sprawdzająca kolizję dwóch obiektów
function wykrywanieKolizji({parametr1,parametr2}) {
    return(
        parametr1.pozycja.x-8 + parametr1.width >= parametr2.pozycja.x &&
        parametr1.pozycja.x+8 <= parametr2.pozycja.x + parametr2.width  &&
        parametr1.pozycja.y+112 <= parametr2.pozycja.y + parametr2.height &&
        parametr1.pozycja.y + parametr1.height >= parametr2.pozycja.y
    )
}

function spawn_potworow_i_innych(){
    let ilosc_pol_do_spawnu = 0;
    var potwory_lokalizacja=[];
    for(let i=0; i<potwory_spawn.length; i++){
        if(potwory_spawn[i]===0){
            ilosc_pol_do_spawnu++;
        }
    }
    
    for(let i=0; i<czas; i++){
        let miejsce_spawnu_mobow = 0;
        const pozycja = Math.floor(Math.random() * (ilosc_pol_do_spawnu-i))+1;
        for(let j=0; j<pozycja; miejsce_spawnu_mobow++){
            if(potwory_spawn[miejsce_spawnu_mobow]===0){
                j++;
            }
        }
        miejsce_spawnu_mobow--;
        potwory_spawn[miejsce_spawnu_mobow] = Math.floor(Math.random() * 14)+1;
        potwory_lokalizacja[i] = {numer_przeciwnika: potwory_spawn[miejsce_spawnu_mobow], numer_id: miejsce_spawnu_mobow};
        //console.log(potwory_lokalizacja[i]);
    }
    const pomoc_fast=mapa.get(fast_map);
    pomoc_fast.moby = potwory_lokalizacja;
    mapa.set(fast_map, pomoc_fast);
}

function dane_potworow_i_innych(){
    //console.log(mapa.get(fast_map));
    const pomoc_fast=mapa.get(fast_map);
    
    for(let i=0; i<pomoc_fast.ilosc_mobow;i++){
        //console.log(pomoc_fast.moby[i]);
        
    }
}
function zabicie_moba(){
    const pomoc_fast=mapa.get(fast_map);
    pomoc_fast.moby.splice(0, 1);
    console.log(pomoc_fast.moby[0]);
}

// Funkcja odpowiadająca za animację gry
function animacja() {
    // Używamy metody window.requestAnimationFrame do odświeżenia animacji
    window.requestAnimationFrame(animacja);
    // Wypełniamy canvas kolorem czarnym, aby wyczyszczać planszę przy każdym odświeżeniu
    canvas.fillStyle = 'black';
    canvas.fillRect(0, 0, grapole.width, grapole.height);

    // Wywołujemy metody draw() na kolejnych elementach gry, aby je narysować
    tlo.draw();
    lewo_Kontent.draw();
    prawe_Kontent.draw();
    gora_Kontent.draw();
    graniczne.forEach((granica) => {
        granica.draw()
    });
    postacGry.draw();
    dol_Kontent.draw();
    tloTOP.draw();
    if(czas!==0){
    testmob.forEach(mob => { 
        mob.draw()
    });}
    //console.log(tlo.pozycja)
    //console.log(tlo.width)
    // Ustawienie czcionki i koloru wypełnienia.
    canvas.font = '24px Arial';
    canvas.fillStyle = 'orange';

    // Wyświetlenie nicku w środku canvasu.
    canvas.fillText(nickname, grapole.width/2-32,grapole.height/2-30);

    canvas.fillStyle = 'black';
    canvas.fillRect(0, 0, grapole.width, 60);
    canvas.fillStyle = 'orange';
    canvas.fillRect(0, 55, grapole.width, 5);
    
    serduszka.draw();
    postacGry.ruch=false;

    // Warunek sprawdzający, czy czas gry się jeszcze nie skończył
    /*if(czas>0){
        // Zwiększamy licznik sekundy gry
        sekunda++;
        // Warunek, który ma miejsce co 100 sekund, zmniejsza liczbę pozostałego czasu o 1
        if(sekunda%100 === 0){
            czas-=1;
            const pomoc_fast=mapa.get(fast_map);
            pomoc_fast.ilosc_mobow-=1;
            mapa.set(fast_map, pomoc_fast);
            console.log(czas)
        }
    }*/

    if(czas==0){
        createMapS(tlo.pozycja.x,tlo.pozycja.y);
    }else{
        dane_potworow_i_innych();
    }
    
    // Poruszanie postacią zgodnie z wciśniętymi klawiszami
    var kierunek;

    // Klawisz W - ruch w górę
    if (przyciski.w.press && !przyciski.s.press){
        postacGry.ruch=true;
        // Sprawdzamy, czy postać koliduje z jakąś granicą planszy i zatrzymujemy ruch, jeśli tak
        for(let i = 0; i<graniczne.length; i++){
            const granica = graniczne[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...granica,
                        pozycja: {
                            x: granica.pozycja.x,
                            y: granica.pozycja.y + 3
                        }
                    }
                })
            ){
                postacGry.ruch=false;
                break;
            }
        }
        // Warunek, który ma miejsce gdy czas gry się skończył - sprawdza, czy postać koliduje z jakimś teleportem
        for(let i = 0; i<teleportujace.length; i++){
            const teleport = teleportujace[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...teleport,
                        pozycja: {
                            x: teleport.pozycja.x,
                            y: teleport.pozycja.y + 3
                        }
                    }
                })
            ){
                if(czas===0){
                    aktualne_pole_mapy.y += 1;
                    kierunek = "gora";
                    teleportacia_na_mape(aktualne_pole_mapy.x, aktualne_pole_mapy.y, kierunek);
                    break;
                }else{
                    postacGry.ruch=false;
                    break;
                }
            }
        }
        // Jeśli nie ma kolizji, przesuwamy postać o 3 piksele w górę
        if (postacGry.ruch){
            ruch.forEach((ruch) => {
                ruch.pozycja.y += 3;
        })}
    }
    
    // Klawisz S - ruch w dół
    if (przyciski.s.press && !przyciski.w.press){
        postacGry.ruch=true;
        // Sprawdzanie kolizji z granicami planszy
        for(let i = 0; i<graniczne.length; i++){
            const granica = graniczne[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...granica,
                        pozycja: {
                            x: granica.pozycja.x,
                            y: granica.pozycja.y - 3
                        }
                    }
                })
            ){
                postacGry.ruch=false;
                break;
            }
        }

        // Sprawdzenie kolizji z teleportami, jeśli czas = 0
        for(let i = 0; i<teleportujace.length; i++){
            const teleport = teleportujace[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...teleport,
                        pozycja: {
                            x: teleport.pozycja.x,
                            y: teleport.pozycja.y - 3
                        }
                    }
                })
            ){
                if(czas===0){
                    aktualne_pole_mapy.y -= 1;
                    kierunek = "dol";
                    teleportacia_na_mape(aktualne_pole_mapy.x, aktualne_pole_mapy.y, kierunek);
                    break;
                }else{
                    postacGry.ruch=false;
                    break;
                }
            }
        }
        // Wykonanie ruchu postaci w dół, jeśli nie wykryto kolizji
        if (postacGry.ruch){
            ruch.forEach((ruch) => {
                ruch.pozycja.y -= 3;
        })}
    }
    // Ruch postaci w lewo po naciśnięciu klawisza A
    if (przyciski.a.press && !przyciski.d.press){
        postacGry.obraz = postacie2;
        postacGry.ruch=true;
        // Sprawdzanie kolizji z granicami planszy
        for(let i = 0; i<graniczne.length; i++){
            const granica = graniczne[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...granica,
                        pozycja: {
                            x: granica.pozycja.x + 3,
                            y: granica.pozycja.y
                        }
                    }
                })
            ){
                postacGry.ruch=false;
                break;
            }
        }
        // Sprawdzenie kolizji z teleportami, jeśli czas = 0

        for(let i = 0; i<teleportujace.length; i++){
            const teleport = teleportujace[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...teleport,
                        pozycja: {
                            x: teleport.pozycja.x + 3,
                            y: teleport.pozycja.y
                        }
                    }
                })
            ){
                if(czas===0){
                    aktualne_pole_mapy.x -= 1;
                    kierunek = "prawo";
                    teleportacia_na_mape(aktualne_pole_mapy.x, aktualne_pole_mapy.y, kierunek);
                    break;
                }else{
                    postacGry.ruch=false;
                    break;
                }
            }
        }
        
        // Wykonanie ruchu postaci w lewo, jeśli nie wykryto kolizji
        if (postacGry.ruch){
            ruch.forEach((ruch) => {
                ruch.pozycja.x += 3;
        })}
    
    }
    if (przyciski.d.press && !przyciski.a.press){
        postacGry.obraz = postacie;
        postacGry.ruch=true;
        for(let i = 0; i<graniczne.length; i++){
            const granica = graniczne[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...granica,
                        pozycja: {
                            x: granica.pozycja.x - 3,
                            y: granica.pozycja.y
                        }
                    }
                })
            ){
                postacGry.ruch=false;
                break;
            }
        }
        for(let i = 0; i<teleportujace.length; i++){
            const teleport = teleportujace[i];
            if(
                wykrywanieKolizji({
                    parametr1: postacGry,
                    parametr2: {
                        ...teleport,
                        pozycja: {
                            x: teleport.pozycja.x - 3,
                            y: teleport.pozycja.y
                        }
                    }
                })
            ){
                if(czas===0){
                    aktualne_pole_mapy.x += 1;
                    kierunek = "lewo";
                    teleportacia_na_mape(aktualne_pole_mapy.x, aktualne_pole_mapy.y, kierunek);
                    break;
                }else{
                    postacGry.ruch=false;
                    break;
                }
            }
        }

        if (postacGry.ruch){
            ruch.forEach((ruch) => {
                ruch.pozycja.x -= 3;
        })}

    }
};
animacja();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            przyciski.w.press = true;
            
            break;
        case 's':
            przyciski.s.press = true;
            break;
        case 'a':
            przyciski.a.press = true;
            break;
        case 'd':
            przyciski.d.press = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            przyciski.w.press = false;
            break;
        case 's':
            przyciski.s.press = false;
            break;
        case 'a':
            przyciski.a.press = false;
            break;
        case 'd':
            przyciski.d.press = false;
            break;
    }
});

function tworzenie_mapy_swiata(map){

    this.map = map;
    
    if(typPokuju===0){
        if(this.map.drzwi_gorne === 1){
            for(let i = 0; i<3; i++){
                kolizje[15+6+i]= 1;
                teleport[15+6+i]= 1282;
            }
        }else{
            for(let i = 0; i<3; i++){
                kolizje[15+6+i]= 1281;
                teleport[15+6+i]= 1;
            }
        }

        if(this.map.drzwi_dolne === 1){
            for(let i = 0; i<3; i++){
                kolizje[15*12+6+i]= 1;
                teleport[15*12+6+i]= 1282;
            }
        }else{
            for(let i = 0; i<3; i++){
                kolizje[15*12+6+i]= 1281;
                teleport[15*12+6+i]= 1;
            }
        }

        if(this.map.drzwi_lewe === 1){
            for(let i = 0; i<3; i++){
                kolizje[15*6+i*15]= 1;
                teleport[15*6+i*15]= 1282;
            }
        }else{
            for(let i = 0; i<3; i++){
                kolizje[15*6+i*15]= 1281;
                teleport[15*6+i*15]= 1;
            }
        }

        if(this.map.drzwi_prawe === 1){
            for(let i = 0; i<3; i++){
                kolizje[15*6+14+i*15]= 1;
                teleport[15*6+14+i*15]= 1282;
            }
        }else{
            for(let i = 0; i<3; i++){
                kolizje[15*6+14+i*15]= 1281;
                teleport[15*6+14+i*15]= 1;
            }
        }
    }
    if(typPokuju===1){
        if(this.map.drzwi_gorne === 1){
            for(let i = 0; i<3; i++){
                kolizje[22*2+10+i]= 1;
                teleport[22*2+10+i]= 1282;
            }
        }else{
            for(let i = 0; i<2; i++){
                kolizje[22*2+10+i]= 1281;
                teleport[22*2+10+i]= 1;
            }
        }

        if(this.map.drzwi_dolne === 1){
            for(let i = 0; i<2; i++){
                kolizje[22*19+10+i]= 1;
                teleport[22*19+10+i]= 1282;
            }
        }else{
            for(let i = 0; i<2; i++){
                kolizje[22*19+10+i]= 1281;
                teleport[22*19+10+i]= 1;
            }
        }

        if(this.map.drzwi_lewe === 1){
            for(let i = 0; i<2; i++){
                kolizje[22*11+i*22]= 1;
                teleport[22*11+i*22]= 1282;
            }
        }else{
            for(let i = 0; i<3; i++){
                kolizje[22*11+i*22]= 1281;
                teleport[22*11+i*22]= 1;
            }
        }

        if(this.map.drzwi_prawe === 1){
            for(let i = 0; i<3; i++){
                kolizje[22*11+21+i*22]= 1;
                teleport[22*11+21+i*22]= 1282;
            }
        }else{
            for(let i = 0; i<2; i++){
                kolizje[22*11+21+i*22]= 1281;
                teleport[22*11+21+i*22]= 1;
            }
        }
    }

}

function teleportacia_na_mape(x,y, kierunek){
    this.x = x;
    this.y = y;
    this.kierunek = kierunek;
    
    this.pozycja = {x: this.x, y: this.y};
    for(const klucz of mapa.keys()) {
        if(klucz.x === this.pozycja.x && klucz.y === this.pozycja.y) {
            this.map = mapa.get(klucz);
            fast_map= klucz;
            break;
        }
    }
    
    czas = this.map.ilosc_mobow;

    typPokuju =this.map.nr_pokoju;
    
    this.sec_x = tlo.pozycja.x;
    this.sec_y = tlo.pozycja.y;

    if(typPokuju===0){
        dlugoscMapy = 15;
        kolizje = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281]
        teleport = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }

    if(typPokuju===1){
        dlugoscMapy = 22;
        kolizje=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281]
        teleport=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1282, 1282, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1282, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1282,
            1282, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1282,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1282, 1282, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        potwory_spawn=[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 1000,
            1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
            1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
        
    }

    if(typPokuju===4){
        kolizje=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281, 1281, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1281,
            1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281, 1281]
    }

    tworzenie_mapy_swiata(this.map);
    if(this.kierunek === "gora"){
        if(typPokuju===0){
            createMapS(-10, -350);
        }
        if(typPokuju===1){
            createMapS(-230, -790);
        }
        if(typPokuju===4){
            createMapS(0,0);
        }
    }
    if(this.kierunek === "dol"){
        if(typPokuju===0){
            createMapS(-10 ,270);
        }
        if(typPokuju===1){
            createMapS(-230, 200);
        }
        if(typPokuju===4){
            createMapS(0,0);
        }
    }
    if(this.kierunek === "prawo"){
        if(typPokuju===0){
            createMapS(-390,-70);
        }
        if(typPokuju===1){
            createMapS(-840, -360);
        }
        if(typPokuju===4){
            createMapS(0,0);
        }
    }
    if(this.kierunek === "lewo"){
        if(typPokuju===0){
            createMapS(370,-70);
        }
        if(typPokuju===1){
            createMapS(380, -360);
        }
        if(typPokuju===4){
            createMapS(0,0);
        }
    }

    
}

function testf(){
    for(const key of mapa) {
        console.log(key[0]);
    }
}
function testfa(){
    for(const key of mapa) {
        console.log(key);
    }
}