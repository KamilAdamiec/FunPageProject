// Skrypty Bootstrap
window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

// Skrypt do slidera w formularzu

function slideSwitch() {
  var $active = $(".banner IMG.active");
  if ($active.length === 0) $active = $(".banner IMG:last");
  var $next = $active.next().length ? $active.next() : $(".banner IMG:first");
  $active.addClass("last-active");
  $next
    .css({
      opacity: 0.0,
    })
    .addClass("active")
    .animate(
      {
        opacity: 1.0,
      },
      1000,
      function () {
        $active.removeClass("active last-active");
      }
    );
}
$(function () {
  setInterval("slideSwitch()", 3000);
});

// Walidacja formularza

function sprawdzPole(pole_id, obiektRegex) {
  var obiektPole = document.getElementById(pole_id);
  if (!obiektRegex.test(obiektPole.value)) return false;
  else return true;
}

function sprawdz_radio(nazwa_radio) {
  var obiekt = document.getElementsByName(nazwa_radio);
  for (i = 0; i < obiekt.length; i++) {
    wybrany = obiekt[i].checked;
    if (wybrany) return true;
  }
  return false;
}

function sprawdz_box(box_id) {
  var obiekt = document.getElementById(box_id);
  if (obiekt.checked) return true;
  else return false;
}

function sprawdz() {
  var ok = true;
  obiektImie =
    /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpQqRrSsŚśTtUuVvWwXxYyZzŹźŻż ]{1,15}$/;
  obiektNazwisko =
    /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpQqRrSsŚśTtUuVvWwXxYyZzŹźŻż_ ]{1,15}$/;
  obiektEmail =
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
  if (!sprawdzPole("imie", obiektImie)) {
    ok = false;
    document.getElementById("imie_error").innerHTML = "Wpisz poprawnie Imie!";
  } else document.getElementById("imie_error").innerHTML = "";
  if (!sprawdzPole("nazwisko", obiektNazwisko)) {
    ok = false;
    document.getElementById("nazwisko_error").innerHTML =
      "Wpisz poprawnie nazwisko!";
  } else document.getElementById("nazwisko_error").innerHTML = "";
  if (!sprawdzPole("email", obiektEmail)) {
    ok = false;
    document.getElementById("email_error").innerHTML = "Wpisz poprawnie email!";
  } else document.getElementById("email_error").innerHTML = "";
  if (!sprawdz_radio("genderName")) {
    ok = false;
    document.getElementById("gender_error").innerHTML = "Wybierz płeć!";
  } else document.getElementById("gender_error").innerHTML = "";
  if (
    !sprawdz_box("2017") &&
    !sprawdz_box("2018") &&
    !sprawdz_box("2019") &&
    !sprawdz_box("2020") &&
    !sprawdz_box("2021")
  ) {
    ok = false;
    document.getElementById("rok_error").innerHTML =
      "Nie wybrano roku - brak możliwości wpisania się na listę fanów.";
  } else document.getElementById("rok_error").innerHTML = "";

  var dane = "Następujące dane fana zostaną dodane:\n";
  dane += "Imię: " + document.getElementById("imie").value + "\n";
  dane += "Nazwisko: " + document.getElementById("nazwisko").value + "\n";
  dane += "E-mail: " + document.getElementById("email").value + "\n";
  dane += "Państwo: " + document.getElementById("panstwo").value + "\n";
  dane += "Wybrane lata: ";
  let l = document.getElementsByName("rok");
  for (let i = 0; i < l.length; i++) {
    if (l[i].checked) {
      dane += l[i].id + " ";
    }
  }
  dane += "\n ";
  dane += "Płeć: ";
  let g = document.getElementsByName("genderName");
  for (let i = 0; i < g.length; i++) {
    if (g[i].checked) {
      dane += g[i].value + " ";
    }
  }
  if (ok) {
    if (window.confirm(dane)) {
      dodajFana();
      return ok;
    } else return false;
  } else return false;
}

// Dodawanie fana do bazy

function dodajFana() {
  var fan = {};
  fan.imie = document.getElementById("imie").value;
  fan.nazwisko = document.getElementById("nazwisko").value;
  fan.email = document.getElementById("email").value;
  fan.panstwo = document.getElementById("panstwo").value;
  fan.rok = [];
  let lata = document.getElementsByName("rok");
  for (let i = 0; i < lata.length; i++) {
    if (lata[i].checked) {
      fan.rok += lata[i].id + " ";
    }
  }
  let plec = document.getElementsByName("genderName");
  for (let i = 0; i < plec.length; i++) {
    if (plec[i].checked) {
      fan.genderName = plec[i].value;
    }
  }
  var lista = JSON.parse(localStorage.getItem("lista"));
  if (lista === null) lista = [];
  lista.push(fan);
  localStorage.setItem("lista", JSON.stringify(lista));
}

// Usunięcie listy fanów

function usunListeFanow() {
  localStorage.removeItem("lista");
  pokazListe();
}

// Wyświetlenie listy fanów

function pokazListe() {
  var lista = JSON.parse(localStorage.getItem("lista"));
  var el = document.getElementById("list");
  var str = "<h2>Zarejstrowani fani: </h2>";
  if (lista === null)
    el.innerHTML = str + "<p>Brak aktualnie zarejstrowanych fanów</p>";
  else {
    for (i = 0; i < lista.length; i++) {
      var j = i + 1;
      str +=
        "Fan " +
        j +
        ":" +
        "<br>" +
        "Imię: " +
        lista[i].imie +
        "<br>" +
        "Nazwisko: " +
        lista[i].nazwisko +
        "<br>" +
        "E-mail: " +
        lista[i].email +
        "<br>" +
        "Państwo: " +
        lista[i].panstwo +
        "<br>" +
        "Fan w latach: " +
        lista[i].rok +
        "<br>" +
        "Płeć: " +
        lista[i].genderName +
        "<br>";
      str += '<button onclick="usun(' + i + ')">Usuń</button>';
      str +=
        '<button onclick="modyfikuj(' +
        i +
        ')">Edytuj dane</button>' +
        "<br><br>";
    }
    el.innerHTML = str;
  }
}

// Usunięcie pojedyńczego fana

function usun(i) {
  var lista = JSON.parse(localStorage.getItem("lista"));
  localStorage.removeItem(lista.splice(i, 1));
  localStorage.setItem("lista", JSON.stringify(lista));
  pokazListe();
}

// Modyfikacja danych

function czyPusta() {
  let x = true;
  let lata = document.getElementsByName("rok");
  for (let j = 0; j < lata.length; j++) {
    if (lata[j].checked) {
      x = false;
      break;
    }
  }
  return x;
}

function modyfikuj(i) {
  var lista = JSON.parse(localStorage.getItem("lista"));
  var slist = JSON.parse(localStorage.getItem("lista"));

  obiektImie =
    /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpQqRrSsŚśTtUuVvWwXxYyZzŹźŻż_ ]{1,15}$/;
  obiektNazwisko =
    /^[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpQqRrSsŚśTtUuVvWwXxYyZzŹźŻż_ ]{1,15}$/;
  obiektEmail =
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;

  if (confirm("Czy zmodyfikować wprowadzone dane dla tego fana?")) {
    slist[i].imie = document.getElementById("imie").value;
    slist[i].nazwisko = document.getElementById("nazwisko").value;
    slist[i].email = document.getElementById("email").value;
    slist[i].panstwo = document.getElementById("panstwo").value;

    if (!czyPusta()) {
      lista[i].rok = [];
      let lata = document.getElementsByName("rok");
      for (let j = 0; j < lata.length; j++) {
        if (lata[j].checked) {
          lista[i].rok += lata[j].id + " ";
        }
      }
    }

    let plec = document.getElementsByName("genderName");
    for (let j = 0; j < plec.length; j++) {
      if (plec[j].checked) {
        lista[i].genderName = plec[j].value;
      }
    }

    if (slist[i].imie === null || slist[i].imie === "")
      lista[i].imie = lista[i].imie;
    else if (!sprawdzPole("imie", obiektImie)) {
      lista[i].imie = lista[i].imie;
      document.getElementById("imie_error").innerHTML = "Wpisz poprawnie Imie!";
      alert("Modyfikacja imienia nie powiodła się!");
    } else {
      document.getElementById("imie_error").innerHTML = "";
      lista[i].imie = slist[i].imie;
    }

    if (slist[i].nazwisko === null || slist[i].nazwisko === "")
      lista[i].nazwisko = lista[i].nazwisko;
    else if (!sprawdzPole("nazwisko", obiektNazwisko)) {
      lista[i].nazwisko = lista[i].nazwisko;
      document.getElementById("nazwisko_error").innerHTML =
        "Wpisz poprawnie nazwisko!";
      alert("Modyfikacja nazwiska nie powiodła się!");
    } else {
      document.getElementById("nazwisko_error").innerHTML = "";
      lista[i].nazwisko = slist[i].nazwisko;
    }

    if (slist[i].email === null || slist[i].email === "")
      lista[i].email = lista[i].email;
    else if (!sprawdzPole("email", obiektEmail)) {
      lista[i].email = lista[i].email;
      document.getElementById("email_error").innerHTML =
        "Wpisz poprawnie adres email!";
      alert("Modyfikacja adresu email nie powiodła się!");
    } else {
      document.getElementById("email_error").innerHTML = "";
      lista[i].email = slist[i].email;
    }

    if (slist[i].panstwo === lista[i].panstwo)
      lista[i].panstwo = lista[i].panstwo;
    else lista[i].panstwo = slist[i].panstwo;
  }
  localStorage.setItem("lista", JSON.stringify(lista));
  document.getElementById("formula").reset();
  pokazListe();
}
