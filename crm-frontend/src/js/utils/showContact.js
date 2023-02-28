export function showContact(target) {
  const icon = target.closest('.icon');
  let opacity = 0;

  if (icon) {
    const contactInfo = document.createElement('div');
    const contactInfoInner = document.createElement('div');
    const contactInfoType = document.createElement('span');
    const contactInfoValue = document.createElement('span');

    contactInfo.classList.add('contact-info-wrapper');
    contactInfoInner.classList.add('contact-info-inner');
    contactInfoType.classList.add('contact-info-type');
    contactInfoValue.classList.add('contact-info-value');

    contactInfo.style.opacity = 0;

    contactInfoType.textContent = `${icon.getAttribute('data-type')}:`;
    contactInfoValue.textContent = icon.getAttribute('data-value');

    contactInfoInner.append(contactInfoType, contactInfoValue);
    contactInfo.append(contactInfoInner);

    const raf = () => {
      requestAnimationFrame(() => {
        if (opacity < 1) {
          opacity += 0.05;
          contactInfo.style.opacity = opacity.toString();
          raf();
        }
      });
    }
    raf();

    target.prepend(contactInfo);

    icon.addEventListener('mouseout', () => {
      hideContact(contactInfo);
    });
  }

  function hideContact(elem) {
    elem.remove();
  }
}
