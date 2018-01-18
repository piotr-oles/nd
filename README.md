# ND
> N-dimensional graphic engine.

Authors: Piotr Oleś, Łukasz Dobosz

## Instalacja
Aby uruchomić ten projekt, należy najpierw zainstalować yarn-a/npm-a.
Gdy mamy już wszystko gotowe, możemy zbudować developerską wersję aplikacji
```
yarn && yarn dev
```
Po chwili powinien być dostępny serwer na adresie `localhost:3000`

## Opis problemu
Renderowanie obrazu 3-wymiarowego polega na zrzutowaniu go na 2-wymiarowy ekran.
Jak można zauważyć, operacja rzutowania nie jest określona tylko dla 3 wymiarów.
Co jeśli chcielibyśmy zrzutować obiekt 4-ro, 5-cio, n-wymiarowy?

Ze względu na wydajność, silnik graficzne są zoptymalizowane do rendenrowania
obrazu 3-wymiarowego. Z tego powodu nie ma prostej ścieżki do renderowania obiektów
więcej niż 3-wymiarowych.

## Struktura biblioteki
### algorithm
Zawiera algorytmy niezbędne do generowania geometrii.

 * `detectFaces` - znajduje ściany bryły wielowymiarowej na podstawie samych wierzchołków.
                   Dzięki temu możliwa jest prawidłowa triangulacja geometrii.
                   Algorytm ten buduje równanie płaszczyzny w hiperprzestrzenii dla 3 dowolnych punktów
                   i szuka innych punktów które je spełniają
 * `expandByTranslation` - rozszerza geometrię do wyższego wymiaru przez skopiowanie
                           wszystkich jej wierzchołków i połączenie ich krawędziami.
 * `triangulate` - dzieli daną ścianę na listę trójkątów które pokrywają całą jej powierzchnię
 * `walk` - przechodzi przez kolejne wierzchołki geometrii. Jest to algorytm przeszukiwania grafu w głąb.
 
### camera
Zawiera 3 rodzaje kamer:
 * `OrthographicCamera` - najprostsza kamera - usuwa informacje o wyższych wymiarach
 * `PerspectiveCamera` - kamera która bierze pod uwagę odległość punktów od kamery. 
                         Dzięki temu tworzy perspektywę.
 * `HybridCamera` - dla wyższych wymiarów zachowuje się jak OrthographicCamera, dla 3-wymiarów jak PerspectiveCamera
 
### geometry
Zawiera definicje geometrii. Obecnie jest tylko jedna - `HyperCubeGeometry`.
Jest ona rozszerzeniem klasy `Geometry` i ułatwia generowanie n-wymiarowego sześcianu.

### material
Zawiera definicje materiałów. Obecnie jest tylko jeden - `HyperDepthMaterial`
Jest on rozszerzeniem klasy `Material` i zarządza fragment i vertex shaderem.

### math
Zawiera niezbędne narzędzia matematyczne
 * `Angle` - umożliwia prostą konwersję ze stopni na radiany i na odwrót
 * `Compare` - umożliwia porównanie dwóch liczb zmiennoprzecinkowych uwzględniając niedokładność tych liczb.
 * `Geometry` - bazowa klasa da geometrii
 * `Matrix` - umożliwia podstawowe operacja na n-wymiarowej macierzy. Operacje te zostały wywnioskowane
              na podstawie mechanizmów dostępnych w silnikach 3d.
 * `Plane` - umożliwia stworzenie równania płaszczyzny w hiperprzestrzenii dla trzech punktów
             nie leżących w tym samym punkcie lub prostej.
 * `Set` - umożliwia generowanie zbiorów. Technicznie, funkcje te są zaimplementowane
           jako generatory przez co możemy zaoszczędzić pamięć w niektórych przypadkach.
 * `Vector` - podobnie jak Matrix umożliwia podstawowe operacje na n-wymiarowym wektorze.

### primitive
Zawiera podstawowe klasy/interfejsy
 * `Camera` - interfejs do kamery
 * `Item` - element sceny - łączy ze sobą informacje o geometrii i materiale
 * `Material` - bazowa klasa dla materiału
 * `Point` - interfejsy dla punktów
 * `Scene` - scena na której mamy dane obiekty

### /
 * `Aniamtor` - zarządza cyklicznym wywoływaniem funkcji renderującej
  * `Renderer` - komponent który zarządza renderowaniem sceny.
  * `BoundedRenderer` - podobny do `Renderer`, z taką różnicą, że niektóre elementy
                        są przypisane do renderera i nie trzeba ich przekazywać przy każdym wywołaniu funkcji render.                     
  * `Canvas` - ozdabia Canvas, aby uprościć nietkóre fragmenty kodu
  * `WebGL` - zawiera stałe WebGL-a aby były dostępne w czasie wykonania
