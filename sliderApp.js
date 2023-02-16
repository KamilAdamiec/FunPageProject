const tl = gsap.timeline({
    defaults: {
        ease: "power1.out"
    }
});

tl.to(".slider", { y: "-100%", duration: 1.5, delay: 1 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");