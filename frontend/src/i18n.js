import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
        en: {
          translations: {
              "Delete":"Delete",
              "Illness":"Illness",
              "My account": "My Account",
              "My current parameters": "My current parameters",
              "My current illness": "My current illness",
              "Diary": "Diary",
              "First Name": "First Name",
              "Last Name": "Last Name",
              sex: "sex",
              age: "age",
              "doc's gmail":"doc's gmail",
              mail: "mail",
              "My weight":"My weight",
              "My height": "My height",
              title:"title",
              Stage:"stage",
              "Add new paramaters": "Add new paramaters",
              "Add new illness": "Add new illness",
              "Daily note":"Daily note",
              "Add new note": "Add new note",
              "Admin": "Admin",
              "Last Results":  "Last Results",
              "Health Check": "Health Check",
              "Profile":"Profile",
              "Calculator":  "Calculator",
              Weight:"Weight",
              Height: "Height",
              Activity:"Activity",
              "Do you want to delete?":"Do you want to delete?",
              "This action is irreversible":"This action is irreversible",
              "Submit": "Submit",
              "Please, add your note": "Please, add your note",
              "Type your note":"Type your note",
              "Add": "Add",
              "Sorry":"Sorry",
              "Unfortunatelly, for now, we can support only COVID illness. We will develop new tools soon":
              "Unfortunatelly, for now, we can support only COVID illness. We will develop new tools soon",
              "Admin Dashboard": "Admin Dashboard",
              "ILLNESS LIST":"ILLNESS LIST",
              "USER LIST": "USER LIST",
              "Title":"Title",
              "Level":"Level",
              "Add new illness by clicking on this button":
              "Add new illness by clicking on this button",
              "Add illness":"Add Illness",
              Name: "Name",
              Lastname: "Lastname",
              Temperature:"Temperature",
              "Heart rate":"Heart rate",
              Saturation:"Saturation",
              Continue:"Continue",
              Erythrocytes:"Erythrocytes",
              Hemoglobin:"Hemoglobin",
              Leukocytes:"Leukocytes",
              Patelets:"Patelets",
              Basophils:"Basophils",
              Eosinophils:"Eosinophils",
              Lymphocytes:"Lymphocytes",
              Monocytes:"Monocytes",
              "Rate your feeling of stress":
              "Rate your feeling of stress",
            "Rate your feeling of anexity":
            "Rate your feeling of anexity",
            "Rate your feeling of indifference":
            "Rate your feeling of indifference",
            "Rate your feeling of loneliness":
            "Rate your feeling of loneliness",
            "Question 1": "Question 1",
            "Question 2": "Question 2",
            "Question 3": "Question 3",
            "Question 4": "Question 4",
            "Be Healthy":
              "Be Healthy",
              "Your results are ready":  "Your results are ready",
              "To download your results press the Download button":
              "To download your results press the Download button",
              "Download":"Download",
              "We advise you to get lungs screen and go to the specialist":
              "We advise you to get lungs screen and go to the specialist",
              "Your saturation looks okay":"Your saturation looks okay",
              "Your blood test passed":"Your blood test: passed",
              "Your blood test: failed":"Your blood test: failed",
              "We advise you to make a visit to cardiologist":
              "We advise you to make a visit to cardiologist",
              "Your heart looks okay":"Your heart looks okay",
              "Your mental state is okay":"Your mental state is okay",
              "We advise you to make a psychologist visit":"We advise you to make a psychologist visit",
              "Blood results:":"Blood results",
              "My results":"My results",
              "saturation:":"saturation:",
              "Leukocytes:":"Leukocytes:",
              "Lymphocytes:": "Lymphocytes:",
              "Bazophils:":"Bazophils:",
              "Erythrocytes:":"Erythrocytes:",
              "Eosinophils:":"Eosinophils:",
              "Hemoglobin:":"Hemoglobin:",
              "Monocytes:":"Monocytes:",
              "Patelets:":"Patelets:",
              "Psychological check:":"Psychological check:",
              "Please enter valid weight":"Please enter valid weight",
              "Required":"Required",
              "Please enter valid height":"Please enter valid height",
              "Please enter a valid height":"Please enter a valid height",
              "This field is required":"This field is required",
              "Email is invalid":"Email is invalid",
              "Password is required":"Password is required",
              "Must be 15 characters or less":
              "Must be 15 characters or less",
              "You cannot be under 16":"You cannot be under 16",
            "sign in": "Sign In",
            "Don't have an account?": "Don't have an account?",
            "sign up": "Sign Up",
            "Name is required!": "Name is required!",
            "City is required!": "City is required!",
            "Country is required!": "Country is required!",
            "Phone is incorrect!": "Phone is incorrect!",
            "Phone is required!": "Phone is required!",
            "Address is required!": "Address is required!",
            "Password doesn't match": "Password doesn't match",
            "Password confirm is required": "Password confirm is required",
            "Your Name": "Your Name",
            "New Password": "New Password",
            "Your country": "Your country",
            "Your city": "Your city",
            "Your address": "Your address",
            "Your phone": "Your phone",
            "Already have an account?": "Already have an account?",
            "Language": "Language",
            Ukraine: "Ukrainian",
            Russian: "Russian",
            English: "English",
            Name: "Name",
            Time: "Time",
            "Enter your name":"Enter your name",
            "Enter your surname":"Enter your surname",
            "Enter your email":"Enter your email",
            "Enter your doctor's email": "Enter your doctor's email",
            "Enter your age": "Enter your age",
            Gender:"Gender",
            "Enter your password":"Enter your password",
            "Enter your password once more": "Enter your password once more",
            "Successfully logged in":"Successfully logged in",
            "Invalid username or password, please try again!":
            "Invalid username or password, please try again!",
            "Your answers were saved":"Your answers were saved",
            "Something went wrong, please try again!":"Something went wrong, please try again!",
            "An error occured, please reload this page!":
            "An error occured, please reload this page!",
            "Something went wrong":"Something went wrong",
            "Password must be the same!":"Password must be the same!",
            "Last Name": "Last Name",
            "Complete":"Complete",
            "My current illnesses":"My current illnesses",
            Email: "Email",
            Country: "Country",
            City: "City",
            "Enter your new password": 'Enter your new password',
            "Cancel":"Cancel",
            "Add new parameters":"Add new parameters",
            "Your comment is added":"Your comment is added",
            "Once a week":"Once a week",
            "3 times a week":"3 times a week",
            "5 times a week":"5 times a week",
            "Edit profile":"Edit profile",
            "Change":"Change",
            "Male":"Male",
            "Female":"Female",
            "Enter your username":"Enter your email",
            "height":"height",
            "weight":"weight",

          },
        },
        ua: {
          translations: {
            "Be Healthy":
              "Будьте здорові!",
              "Add new parameters":"Додати нові параметри",
              "My account": "Мій акаунт",
              "My current parameters": "Мої поточні параметри",
              "My current illnesses": "Мої нинішні хвороби",
              "Diary": "Щоденник",
              "First Name": "Ім'я",
              "Last Name": "Прізвище",
              sex: "стать",
              age: "вік",
              "doc's gmail":"пошта доктора",
              mail: "пошта",
              "My weight":"Mоя вага",
              "My height": "Мій зріст",
              title:"назва",
              Stage:"Cтупінь",
              "Add new paramaters": "Додати нові параметри",
              "Add new illness": "Додайте нову хворобу",
              "Daily note":"Щоденна записка",
              "Add new note": "Додати нову нотатку",
              "Admin": "Адмін",
              "Last Results":  "Останні результати",
              "Health Check": "Перевірка здоров'я",
              "Profile":"Профіль",
              "Calculator":  "Калькулятор",
              Weight:"Вага",
              Height: "Зріст",
              Activity:"Діяльність",
              "Submit": "Надіслати",
              "Please, add your note": "Будь ласка, додайте свою примітку",
              "Type your note":"Введіть свою нотатку",
              "Add": "Додати",
              "Sorry":"Вибачте",
              "Unfortunatelly, for now, we can support only COVID illness. We will develop new tools soon":
              "На жаль, наразі ми можемо підтримувати лише хворобу COVID. Незабаром ми розробимо нові інструменти...",
              "Admin Dashboard": "Адмін панель",
              "ILLNESS LIST":"Список хвороб",
              "USER LIST": "Список користувачів",
              "Title":"Назва",
              "Level":"Рівень",
              "Add new illness by clicking on this button":
              "Додайте нову хворобу, натиснувши цю кнопку",
              "Add illness":"Додайте хворобу",
              Name: "Ім'я",
              Lastname: "Прізвище",
              Temperature:"Температура",
              "Heart rate":"Частота пульсу",
              Saturation:"Насичення",
              Continue:"Продовжуйте",
              Erythrocytes:"Еритроцити",
              Hemoglobin:"Гемоглобін",
              Leukocytes:"Лейкоцити",
              Patelets:"Тромбоцити",
              Basophils:"Базофіли",
              Eosinophils:"Еозинофіли",
              Lymphocytes:"Лімфоцити",
              "Change":"Змінити",
              Monocytes:"Моноцити",
              "Edit profile":"Змінити профайл",
              "Rate your feeling of stress":
              "Оцініть своє відчуття стресу",
            "Rate your feeling of anexity":
            "Оцініть своє почуття тривоги",
            "Rate your feeling of indifference":
            "Оцініть своє почуття байдужості",
            "Rate your feeling of loneliness":
            "Оцініть своє відчуття самотності",
            "Question 1": "Питання 1",
            "Question 2": "Питання 2",
            "Question 3": "Питання 3",
            "Question 4": "Питання 4",
              "Your results are ready":  "Ваші результати готові",
              "To download your results press the Download button":
              "Щоб завантажити результати, натисніть кнопку Завантажити",
              "Download":"Завантажити",
              "We advise you to get lungs screen and go to the specialist":
              "Радимо пройти обстеження легенів і звернутися до фахівця",
              "Your saturation looks okay":"наша насиченість виглядає добре",
              "Your blood test passed":"Ваш аналіз крові: пройдено",
              "Your blood test: failed":"Ваш аналіз крові: не пройдено",
              "We advise you to make a visit to cardiologist":
              "Радимо вам звернутися до кардіолога",
              "Your heart looks okay":"Ваше серце виглядає добре",
              "Your mental state is okay":"Ваш психічний стан в порядку",
              "We advise you to make a psychologist visit":"Радімо вам відвідати психолога",
              "Blood results:":"Результати аналізу крові",
              "My results":"Мої результати",
              "saturation:":"сатурація:",
              "Psychological check:":"Психологічна перевірка:",
              "Please enter valid weight":"Будь ласка, введіть дійсну вагу",
              "Required":"Вимагаєтьсяd",
              "Please enter valid height":"Введіть дійсний зріст",
              "Please enter a valid height":"Введіть дійсну висоту",
              "This field is required":"Це поле є обов'язковим",
              "Email is invalid":"Електронна адреса недійсна",
              "Password is required":"Потрібен пароль",
              "Must be 15 characters or less":
              "Має містити 15 символів або менше",
              "You cannot be under 16":"Вам не може бути молодше 16 років",
            "sign in": "Увійти",
            "Don't have an account?": "Немає облікового запису?",
            "sign up": "Зареєструватися",
            "Name is required!": "Ім'я обов'язкове!",
            "Your Name": "Ваше ім'я",
            "New Password": "Новий пароль",
            "Language": "Мова",
            Ukraine: "Українська",
            English: "Англійська",
            "Enter your name":"Введіть ім'я",
            "Enter your surname":"Введіть своє прізвище",
            "Enter your email":"Введіть свою електронну адресу",
            "Enter your doctor's email": "Введіть електронну адресу свого лікаря",
            "Enter your age": "Введіть свій вік",
            Gender:"Стать",
            "Enter your password":"Введіть ваш пароль",
            "Enter your password once more": "Введіть свій пароль ще раз",
            "Successfully logged in":"Успішно ввійшли до акаунту",
            "Invalid username or password, please try again!":
            "Недійсне ім’я користувача або пароль, спробуйте ще раз!",
            "Your answers were saved":"Ваші відповіді збережено",
            "Something went wrong, please try again!":"Сталася помилка, спробуйте ще раз!",
            "An error occured, please reload this page!":
            "Сталася помилка, перезавантажте цю сторінку!",
            "Something went wrong":"Щось пішло не так",
            "Password must be the same!":"Пароль має бути однаковим!",
            "Enter your new password": 'Введіть свій новий пароль',
            Email: "Пошта",
            "Do you want to delete?":"Ви впевненні?",
            "This action is irreversible":"Ця дія незворотна",
            "Cancel":"Закрити",
            "Delete":"Видалити",
            "Illness":"Хвороба",
            "Your comment is added":"Ваш коментар додан",
            "Once a week":"Один раз на тиждень",
            "3 times a week":"3 рази на тиждень",
            "5 times a week":"5 разів на тиждень",
            "Male":"Чоловік",
            "Female":"Жінка",
            "Enter your username":"Введіть свій імейл",
            "Complete":"Завершити",
            "height":"вага",
            "weight":"зріст"
          },
        },
      },
      //lng: sessionStorage.getItem("i18nextLng") || "en",
      //fallbackLng:sessionStorage.getItem("i18nextLng") || "en",
     lng: window.localStorage.getItem("i18nextLng") || "en",
     fallbackLng: window.localStorage.getItem("i18nextLng") || "en",
      debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
      react: {
        wait: true,
      },
    }
  });

export default i18n;
