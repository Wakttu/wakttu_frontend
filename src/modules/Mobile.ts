export const isMobileDevice = (): boolean => {
    //const userAgent = window.navigator.userAgent;
    //return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    return window.matchMedia("(max-width: 767px)").matches;
}
