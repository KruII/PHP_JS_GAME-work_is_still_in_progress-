//Funkcja zwracająca 1 lub 0 na podstawie losowości - parametrem jest dana procentowa szansa
function random(dana) {
    const losowa = Math.floor(Math.random() * 10001);
    if(losowa<=dana*100){
        return 1;
    }
    else{
        return 0;
    }
}

const mapa = new Map();
var aktualne_pole_mapy = {x:0, y:0};

function renderowanie_Pokoju(x,y){
    this.x = x;
    this.y = y;
    this.procent_pokoju = 50;
    this.dodawanie_pola_mapy = {x: this.x, y: this.y};
    this.istnieje_pokoju = false;
    for(const klucz of mapa.keys()) {
        if(klucz.x === this.dodawanie_pola_mapy.x && klucz.y === this.dodawanie_pola_mapy.y){
            this.istnieje_pokoju= true;
            break;   
        }
    }
    if(!this.istnieje_pokoju){

        this.pokoj_dodawany = {nr_pokoju: 1,
                            drzwi_lewe: 0,
                            drzwi_dolne: 0,
                            drzwi_prawe: 0,
                            drzwi_gorne: 0,
                            odleglosc_od_start: 0,
                            ilosc_mobow: 0,
                            moby: null};

        this.pokoj_dodawany.odleglosc_od_start = Math.abs(this.x)+Math.abs(this.y);

        this.pokoj_dodawany.ilosc_mobow = Math.floor(Math.random() * 10)+5;

        mapa.set(this.dodawanie_pola_mapy, this.pokoj_dodawany);
        

        for(const klucz of mapa.keys()) {
            if(klucz.x === this.dodawanie_pola_mapy.x-1 && klucz.y === this.dodawanie_pola_mapy.y) {
                if(mapa.get(klucz).drzwi_prawe === 1) {
                    this.pokoj_dodawany.drzwi_lewe = 1;
                }else{
                    this.pokoj_dodawany.drzwi_lewe = 2;
                }
            }
            if(klucz.x === this.dodawanie_pola_mapy.x+1 && klucz.y === this.dodawanie_pola_mapy.y) {
                if(mapa.get(klucz).drzwi_lewe === 1) {
                    //console.log("pokoj_prawo")
                    this.pokoj_dodawany.drzwi_prawe = 1;
                }else{
                    this.pokoj_dodawany.drzwi_prawe = 2;
                }
                
            }
            if(klucz.x === this.dodawanie_pola_mapy.x && klucz.y === this.dodawanie_pola_mapy.y+1) {
                if(mapa.get(klucz).drzwi_dolne === 1) {
                    //console.log("pokoj_gora")
                    this.pokoj_dodawany.drzwi_gorne = 1;
                }else{
                    this.pokoj_dodawany.drzwi_gorne = 2;
                }
            }
            if(klucz.x === this.dodawanie_pola_mapy.x && klucz.y === this.dodawanie_pola_mapy.y-1) {
                if(mapa.get(klucz).drzwi_gorne === 1) {
                    //console.log("pokoj_dol")
                    this.pokoj_dodawany.drzwi_dolne = 1;
                }else{
                    this.pokoj_dodawany.drzwi_dolne = 2;
                }
            }
        }

    
        if(this.pokoj_dodawany.odleglosc_od_start <10){
            if(this.pokoj_dodawany.drzwi_lewe === 0){
                if(random(this.procent_pokoju)===1){
                    this.pokoj_dodawany.drzwi_lewe = 1;
                    tworzenie_Pokoju(this.dodawanie_pola_mapy, this.pokoj_dodawany);
                }
            }

            if(this.pokoj_dodawany.drzwi_prawe === 0){
                if(random(this.procent_pokoju)===1){
                    this.pokoj_dodawany.drzwi_prawe = 1;
                    tworzenie_Pokoju(this.dodawanie_pola_mapy, this.pokoj_dodawany);
                }
            }

            if(this.pokoj_dodawany.drzwi_gorne === 0){
                if(random(this.procent_pokoju)===1){
                    this.pokoj_dodawany.drzwi_gorne = 1;
                    tworzenie_Pokoju(this.dodawanie_pola_mapy, this.pokoj_dodawany);
                }
            }

            if(this.pokoj_dodawany.drzwi_dolne === 0){
                if(random(this.procent_pokoju)===1){
                    this.pokoj_dodawany.drzwi_dolne = 1;
                    tworzenie_Pokoju(this.dodawanie_pola_mapy, this.pokoj_dodawany);
                }
            }
        }
    }
    
}

function tworzenie_Pokoju(dodawanie_pola_mapy, pokoj_dodawany) {
    this.dodawanie_pola_mapy = dodawanie_pola_mapy;
    this.pokoj_dodawany = pokoj_dodawany;

    if(pokoj_dodawany.drzwi_lewe === 1){
        //console.log("lewe");
        renderowanie_Pokoju(dodawanie_pola_mapy.x-1,dodawanie_pola_mapy.y);
    }
    if(pokoj_dodawany.drzwi_prawe === 1){
        //console.log("prawe");
        renderowanie_Pokoju(dodawanie_pola_mapy.x+1,dodawanie_pola_mapy.y);
    }
    if(pokoj_dodawany.drzwi_gorne === 1){
        //console.log("gora");
        renderowanie_Pokoju(dodawanie_pola_mapy.x,dodawanie_pola_mapy.y+1);
    }
    if(pokoj_dodawany.drzwi_dolne === 1){
        //console.log("dolne");
        renderowanie_Pokoju(dodawanie_pola_mapy.x,dodawanie_pola_mapy.y-1);
    }

    //console.log("dane:");
    
    //console.log(this.dodawanie_pola_mapy);
    //console.log(this.pokoj_dodawany);
    //this.return_data = {kord: this.dodawanie_pola_mapy, data: this.pokoj_dodawany};
    //return this.return_data;
    
}

//Konstruktor losujący szansę na wystąpienie różnych elementów w grze oraz generujący losową ilość pokoi i ich rozmieszczenie na planszy
function LosowanieZprawdopobienstwa({Lekarz, Sklep, Event, MiniBoss, CzystyPokoj}) {
    this.Lekarz = Lekarz;               //przekazana szansa na lekarza
    this.Sklep = Sklep;                 //przekazana szansa na sklep
    this.Event = Event;                 //przekazana szansa na event
    this.MiniBoss = MiniBoss;           //przekazana szansa na mini bossa
    this.CzystyPokoj = CzystyPokoj;     //przekazana szansa na czysty pokój

    //wywołanie funkcji random dla każdej przekazanej szansy
    this.Lekarz = random(this.Lekarz);
    this.Sklep = random(this.Sklep);
    this.Event = random(this.Event);
    this.MiniBoss = random(this.MiniBoss);
    this.CzystyPokoj = random(this.CzystyPokoj);
    
    //wypisanie wylosowanych szans na konsoli
    //console.log("Prawdopodobieństwo Pokoi:",this.Lekarz,this.Sklep,this.Event,this.MiniBoss,this.CzystyPokoj);

    //losowanie ilości pokoi (od 15 do 24) oraz dodanie do niej wartości wylosowanych szans i 2
    this.IloscPokoi = Math.floor(Math.random() * 10)+15+(this.Lekarz,this.Sklep,this.Event,this.MiniBoss,this.CzystyPokoj)+2;
    //wypisanie ilości pokoi na konsoli
    //console.log("Ilość Pokoi:",this.IloscPokoi);

    //generowanie pustej planszy
    var dodawanie_pola_mapy = {x:0, y:0};
    var pokoj_dodawany = {nr_pokoju: 0,
                          drzwi_lewe: 1,
                          drzwi_dolne: 0,
                          drzwi_prawe: 1,
                          drzwi_gorne: 0,
                          odleglosc_od_start: 0,
                          ilosc_mobow: 0,
                          moby: 0};
    
    mapa.set(dodawanie_pola_mapy, pokoj_dodawany);
    
    //this.return_data=
    tworzenie_Pokoju(dodawanie_pola_mapy, pokoj_dodawany);
    
    //console.log(this.return_data);
    
    //mapa.set(this.return_data.kord, this.return_data.data);

    //console.log(aktualne_pole_mapy);

    /*
    for(const klucz of mapa.keys()) {
        if(klucz.x === aktualne_pole_mapy.x && klucz.y === aktualne_pole_mapy.y) {
            break;
        }
    }*/
    

    var najwyzsza_watosc = null;
    var najwyzsza_watosc_ID = null;;
    
    for(const [klucz,wartosc] of mapa) {
        if(najwyzsza_watosc === null || wartosc.odleglosc_od_start > najwyzsza_watosc) {
            najwyzsza_watosc = wartosc.odleglosc_od_start;
            najwyzsza_watosc_ID = klucz;
        }
    }
    for(const klucz of mapa.keys()) {
        if(klucz.x === najwyzsza_watosc_ID.x && klucz.y === najwyzsza_watosc_ID.y) {
            mapa.get(klucz).nr_pokoju = 4;
            mapa.set(klucz, mapa.get(klucz));
            break;
        }
    }
    //console.log(najwyzsza_watosc,najwyzsza_watosc_ID);


   
}

const prawdopodobiestwo= LosowanieZprawdopobienstwa({
    Lekarz: 7.25,
    Sklep: 15.25,
    Event: 11.50,
    MiniBoss: 34.75,
    CzystyPokoj: 0.25
})