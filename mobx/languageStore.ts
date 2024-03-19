import { makeAutoObservable } from 'mobx';

// Стейт MobX который содержит текущий язык приложения 
class LanguageStore {

  // Стейт
  language = 'ru'; // Изначально русский язык

  // Конструктор класса, который вызывает makeAutoObservable для автоматического создания свойств и методов
  constructor () {
    makeAutoObservable(this)
  }

  // Метод для переключения языка в стейте
  toggleLanguage = (lang: 'ru' | 'en') => {
    this.language = lang;
  }
}

export default new LanguageStore();
