import AsyncStorage from '@react-native-community/async-storage'
import { generateUID } from "./helper";

const KEY = "QuizDetails";

function initialData() {
  return {
    "qwertyuiopasdfghjklzxc": {
      id: "qwertyuiopasdfghjklzxc",
      title: "Algorithms",
      questions: [
        {
          question: "What is Algorithms?",
          answer:
            "A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer."
        },
        {
          question: "Are algorithms important?",
          answer:
            "YES"
        },
        {
          question: "Why algorithms?",
          answer:
            "It helps to solve problems that otherwise could be much harder to solve."
        },
      ]
    },
    "mnbvcxzlkjhgfdsaqwerty": {
      id: "mnbvcxzlkjhgfdsaqwerty",
      title: "Data Structure",
      questions: [
        {
          question: "What is Data Structure?",
          answer: "A data structure is a particular way of organizing data in a computer so that it can be used effectively."
        },
        {
          question: "Is Data Structure important?",
          answer: "Data Structures are the key part of many computer algorithms as they allow the programmers to do data management in an efficient way."
        },
      ]
    },
    "poiuytrewqasdfghjklmnb": {
      id: "poiuytrewqasdfghjklmnb",
      title: "Development",
      questions: [
        {
          question: "What is Software Development?",
          answer: "Software development refers to a set of computer science activities dedicated to the process of creating, designing, deploying and supporting software."
        },
      ]
    },
  };
}

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(KEY);
    if (results) {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

export async function saveDeckTitle(title) {
  const id = generateUID();
  const deck = {
    id: id,
    title: title,
    questions: []
  };

  await AsyncStorage.mergeItem(
    KEY,
    JSON.stringify({
      [id]: deck
    })
  );
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

export async function removeDeck(deckId) {
  const results = await AsyncStorage.getItem(KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }
  return {};
}
