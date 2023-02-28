export function preloader() {
  const preloaderContainer = document.createElement('div');
  const preloader = document.createElement('div');
  const spinner = document.createElement('div');
  const rolling = document.createElement('div');
  const innerSpiner = document.createElement('div');

  preloaderContainer.classList.add('preloader');
  preloader.classList.add('preloader__loader');
  spinner.classList.add('loadingio-spinner-rolling-esettsv4zm');
  rolling.classList.add('ldio-hu8xr3xorjc');

  rolling.append(innerSpiner);
  spinner.append(rolling);
  preloader.append(spinner);
  preloaderContainer.append(preloader);

  return preloaderContainer;
}
