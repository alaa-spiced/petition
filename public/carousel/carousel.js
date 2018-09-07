(function() {
    var kitties = document.getElementsByClassName("kitty");
    var dots = document.getElementsByClassName("dot");
    var current = 0;
    var isTransitioning;
    var timer;

    function moveKitties(next) {
        dots[current].classList.remove("hightlight");
        kitties[current].classList.remove("onscreen");
        kitties[current].classList.add("exit");
        isTransitioning = true;

        if (typeof next != "undefined") {
            current = next;
        } else {
            current++;
        }

        if (current >= kitties.length) {
            current = 0;
        }

        kitties[current].classList.add("onscreen");
        dots[current].classList.add("hightlight");
    }
    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            isTransitioning = false;
            timer = setTimeout(moveKitties, 2000);
        }
    });
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", eventHandler(i));
    }

    function eventHandler(n) {
        return function(e) {
            if (e.target.classList.contains("hightlight")) {
                return;
            }
            if (isTransitioning) {
                return;
            }

            clearTimeout(timer);
            moveKitties(n);
        };
    }
    timer = setTimeout(moveKitties, 2000);
})();
