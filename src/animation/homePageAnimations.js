export const homePageAnimations = {
    initial: {
        opacity: 0,
    },

    animateFromLeft: {
        opacity: [0, 0.25, 0.5, 0.75, 1],

        x: [-1000, -500, -200, 1],
    },

    animateFromRight: {
        opacity: [0, 0.25, 0.5, 0.75, 1],

        x: [1000, 500, 200, 1],
    },

    transition: {
        duration: 1.5,
        ease: "linear",
    },
};
