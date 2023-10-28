import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Firestore, QuerySnapshot ,addDoc,onSnapshot,orderBy, query } from 'firebase/firestore';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import { firestore,MESSAGES, collection } from './firebase/config';

export default function App() {

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const save = async() => {
    const docRef = await addDoc(collection(firestore,MESSAGES), {
      text: newMessage
    })
    setNewMessage('')
    console.log('Message saved')
  }

 useEffect(() => {
  const q = query(collection(firestore,MESSAGES),orderBy('created','desc'))

  const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
    const tempMessages =[]

    QuerySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,
        text: doc.data().text,
        created: convertFirebaseTimeStampToJS(doc.data().created)
      }
      tempMessages.push(messageObject)
    })
    setMessages(tempMessages)
  })

  return () => {
    unsubscribe()
  }
 }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo} >{message.created}</Text>
              <Text>{message.Text}</Text>
              <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
              <Button title='Send' type='button' onPress={save} />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}  
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom:10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  },
});

