import React from 'react';
import i18n from '../i18n';

function ChangeTranslation () {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="flex self-baseline p-6">
      <button onClick={() => changeLanguage('de')}>de</button><span className='m-4'>|</span>
      <button onClick={() => changeLanguage('en')}>en</button><span className='m-4'>|</span>
      <button onClick={() => changeLanguage('fr')}>fr</button>
    </div>
  )
}

export default ChangeTranslation;