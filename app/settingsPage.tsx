import Checkbox from 'expo-checkbox';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { I18n } from 'i18n-js';
import languageStore from '@/mobx/languageStore';
import { observer } from 'mobx-react-lite';

interface IMobxTools {
  language: string,
  toggleLanguage: (lang: "ru" | "en") => void
}

const SettingsPage = observer(() => {
  
  // стейт и функция его изменения из MobX
  const { language, toggleLanguage }:IMobxTools = languageStore;

  // создаем экземпляр с переводами слов
  const i18n = new I18n({
    en: {
      Язык: 'Language',
      Русский: 'Russian',
      Английский: 'English',
    },
    ru: {
      Язык: 'Язык',
      Русский: 'Русский',
      Английский: 'Английский',
    },
  });

  // устанавливаем тот язык перевода, который на данный момент в стейте Mobx
  i18n.locale=language


  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>{i18n.t('Язык')}:</Text> 
        <View>

          {/* Кликабельный контенер с чекбоксом для выбора русского языка */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleLanguage('ru')}>
            <Checkbox
              value={language === 'ru'}
              onValueChange={() => toggleLanguage('ru')}
            />
            <Text style={styles.checkboxText}>{i18n.t('Русский')}</Text> 
          </TouchableOpacity>


          {/* Кликабельный контенер с чекбоксом для выбора английского языка */}
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleLanguage('en')}>
            <Checkbox
              value={language === 'en'}
              onValueChange={() => toggleLanguage('en')}
            />
            <Text style={styles.checkboxText}>{i18n.t('Английский')}</Text> 
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 18,
    marginLeft: 10
  },
});

export default SettingsPage;









