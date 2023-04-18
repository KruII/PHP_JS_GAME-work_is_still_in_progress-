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
    console.log("Prawdopodobieństwo Pokoi:",this.Lekarz,this.Sklep,this.Event,this.MiniBoss,this.CzystyPokoj);

    //losowanie ilości pokoi (od 15 do 24) oraz dodanie do niej wartości wylosowanych szans i 2
    this.IloscPokoi = Math.floor(Math.random() * 10)+15+(this.Lekarz,this.Sklep,this.Event,this.MiniBoss,this.CzystyPokoj)+2;
    //wypisanie ilości pokoi na konsoli
    console.log("Ilość Pokoi:",this.IloscPokoi);

    //generowanie pustej planszy o wymiarach 9x9x5
    this.Mapa = [
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[12,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
                    [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
                ];

    // Deklaracja zmiennych pomocniczych do losowania
    this.LosowanieX = Math.floor(Math.random()*2);
    this.LosowanieY = Math.floor(Math.random()*2);
    this.Pomocnicza = Math.floor(Math.random()*2);
    this.Drzwi = [0,0,0,0];

    // Ustalenie, gdzie są drzwi i gdzie rozpoczyna się nowy pokój
    if(this.LosowanieX===0){
        this.LosowanieX=0;
        if(this.Pomocnicza===0){
            this.Drzwi = [0,0,1,0];}
    }else{
        this.LosowanieX=8;
        if(this.Pomocnicza===0){
            this.Drzwi = [1,0,0,0];}
    }if(this.LosowanieY===0){
        this.LosowanieY=0;
        if(this.Pomocnicza===1){
            this.Drzwi = [0,0,0,1];}
    }else{
        this.LosowanieY=8;
        if(this.Pomocnicza===1){
            this.Drzwi = [0,1,0,0];}
    }

    // Ustalenie, gdzie są drzwi i gdzie rozpoczyna się nowy pokój
    this.Mapa[this.LosowanieX][this.LosowanieY] = [5,this.Drzwi[0],this.Drzwi[1],this.Drzwi[2],this.Drzwi[3]]

    // Dekrementacja ilości pokojów
    this.IloscPokoi-=2;
    this.Pozycja={
        x: 4,
        y: 4};
    this.RodzajPokoju = Math.floor(Math.random()*4)+1;
    this.Drzwi = [0,0,0,0];

    // Wylosowanie kierunku do którego gracz ma się przemieścić
    this.Pomocnicza = Math.floor(Math.random()*2);
    if (this.Pomocnicza===0) {
        this.Pozycja.x--;}
    else{
        this.Pozycja.x++;}
    console.log(this.Pozycja,this.Pomocnicza)

    // Wylosowanie kierunku do którego gracz ma się przemieścić
    for (let ilosci = 0; ilosci < 5; ilosci++) {

        this.OtoczeniePokoje={
            gora:false,
            dol:false,
            lewo:false,
            prawo:false,
            ilosc:0};
        this.OtoczeniePokojeint=[0,0,0,0]

        // Sprawdzenie czy w danym kierunku jest pokój i ustawienie flagi w odpowiednim miejscu
        if (this.Mapa[this.Pozycja.x][this.Pozycja.y-1][0]===0){
            this.OtoczeniePokoje.ilosc++;
            this.OtoczeniePokoje.gora=true;
            this.OtoczeniePokojeint[1]=1;}
        if (this.Mapa[this.Pozycja.x][this.Pozycja.y+1][0]===0){
            this.OtoczeniePokoje.ilosc++;
            this.OtoczeniePokoje.dol=true;
            this.OtoczeniePokojeint[3]=1;}
        if (this.Mapa[this.Pozycja.x-1][this.Pozycja.y][0]===0){
            this.OtoczeniePokoje.ilosc++;
            this.OtoczeniePokoje.lewo=true;
            this.OtoczeniePokojeint[0]=1;}
        if (this.Mapa[this.Pozycja.x+1][this.Pozycja.y][0]===0){
            this.OtoczeniePokoje.ilosc++;
            this.OtoczeniePokoje.prawo=true;
            this.OtoczeniePokojeint[2]=1;}

        console.log(this.OtoczeniePokoje)

        // Sprawdzenie, czy pokój ma drzwi na górze i ustawienie ich, jeśli tak
        if(!this.OtoczeniePokoje.gora){
            if(this.Mapa[this.Pozycja.x][this.Pozycja.y-1][4]===1){
                this.Drzwi[3] = 1; 
            }
        }
        // Sprawdzenie, czy pokój ma drzwi na dole i ustawienie ich, jeśli tak
        if(!this.OtoczeniePokoje.dol){
            if(this.Mapa[this.Pozycja.x][this.Pozycja.y+1][2]===1){
                this.Drzwi[1] = 1; 
            }
        }
        // Sprawdzenie, czy pokój ma drzwi po lewej i ustawienie ich, jeśli tak
        if(!this.OtoczeniePokoje.lewo){
            if(this.Mapa[this.Pozycja.x-1][this.Pozycja.y][1]===1){
                this.Drzwi[0] = 1; 
            }
        }
        // Sprawdzenie, czy pokój ma drzwi po prawej i ustawienie ich, jeśli tak
        if(!this.OtoczeniePokoje.prawo){
            if(this.Mapa[this.Pozycja.x+1][this.Pozycja.y][3]===1){
                this.Drzwi[2] = 1; 
            }
        }

        // Losowanie drzwi w pokoju
        this.Pomocnicza=Math.floor(Math.random()*OtoczeniePokoje.ilosc);
        for (let i = 0; true;) {
            if (this.Drzwi[this.Pomocnicza+i]===0) {
                this.Drzwi[this.Pomocnicza+i]=1;
                this.OtoczeniePokoje.ilosc-=1;
                if(this.OtoczeniePokoje.ilosc>0 && Math.floor(Math.random()*4)===0){
                    this.Pomocnicza=Math.floor(Math.random()*OtoczeniePokoje.ilosc);
                    i=0;}
                else{
                    break;}
            }else{
                i++;
            }
        }

        // Ustawienie informacji o pokoju w mapie i wyświetlenie jej w konsoli
        this.Mapa[this.Pozycja.y][this.Pozycja.x]=[this.RodzajPokoju,this.Drzwi[0],this.Drzwi[1],this.Drzwi[2],this.Drzwi[3]];
        console.log(this.Mapa[this.Pozycja.y][this.Pozycja.x])

        // Zmniejszenie ilości otaczających pokoi i losowanie drzwi do kolejnego pokoju
        this.OtoczeniePokoje.ilosc=3-this.OtoczeniePokoje.ilosc;
        this.Pomocnicza=Math.floor(Math.random()*OtoczeniePokoje.ilosc);

        // Przejście do kolejnego pokoju
        this.pomocint=0;
        for (let i = 0; true;) {
            if (this.Drzwi[i]===1 && this.OtoczeniePokojeint[i]===1) {
                if (this.pomocint===this.Pomocnicza) {
                    if (i===0) {
                        this.Pozycja.x--;
                    }if (i===1) {
                        this.Pozycja.y--;
                    }if (i===2) {
                        this.Pozycja.x++;
                    }if (i===3) {
                        this.Pozycja.y++;}
                    break;
                }else{
                    i++;
                    this.pomocint++;}
            }else{
                i++;
            }
            console.log(this.pomocint,this.Pomocnicza,this.Drzwi,this.OtoczeniePokojeint,i)
        }
        this.Drzwi = [0,0,0,0];
        this.RodzajPokoju = Math.floor(Math.random()*4)+1;
        this.IloscPokoi-=1;
    }
    while (this.Pozycja.y===this.LosowanieY && this.Pozycja.x===this.LosowanieY) {
        
    }

    for (let y = 0; y < 9; y++) {
        console.log(this.Mapa[y][0],this.Mapa[y][1],this.Mapa[y][2],this.Mapa[y][3],this.Mapa[y][4],this.Mapa[y][5],this.Mapa[y][6],this.Mapa[y][7],this.Mapa[y][8]);}
}

const prawdopodobiestwo= LosowanieZprawdopobienstwa({
    Lekarz: 7.25,
    Sklep: 15.25,
    Event: 11.50,
    MiniBoss: 34.75,
    CzystyPokoj: 0.25
})

