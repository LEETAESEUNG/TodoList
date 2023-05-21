import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import {useState} from 'react'

export default function App(){
  const [myTextInput,setMyTextInput] = useState("");  //입력된 텍스트 값을 저장
  const [myTextInputs,setMyTextInputs] = useState([]);  //추가된 할 일 목록을 배열로 저장
  const [editIndex, setEditIndex] = useState(-1);  //수정 중인 할 일의 인덱스를 저장, 수정 중이 아닐 때는 -1로 초기화
  const [inputTime, setInputTime] = useState([]);  //시간 및 날짜를 배열
  const [starColors, setStarColors] = useState([]);  // 별 모양 배열
  
  
  const onChangeInput = (event) => {setMyTextInput(event)}

  const onAddTextInput = () => {   //항목을 추가하거나 수정하는 함수
    if (editIndex !== -1) {
      myTextInputs[editIndex] = myTextInput
      setEditIndex(-1)
   } 
   else {
      setMyTextInputs([...myTextInputs, myTextInput])
      setInputTime([...inputTime, new Date()])
  }
    setMyTextInput('')
  }
  
 const onDelete = (idx) => {    //삭제 함수                           
    setMyTextInputs(myTextInputs.filter((_, i) => i !== idx))
    setStarColors(starColors.filter((_, i) => i !== idx))
    if (idx === editIndex) {
      setEditIndex(-1)
    }
  }
  
  const onEdit = (item, idx) => {          
    setMyTextInput(item)
    setEditIndex(idx)
  }

  const onStar = (idx) => {   //별 모양 바꾸기 함수
    const newStarColor = starColors[idx] === 'yellow' ? 'black' : 'yellow'
    const newStarColors = [...starColors]
    newStarColors[idx] = newStarColor
    setStarColors(newStarColors)
  }
 
  return(
  <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.mainText}>To Do List</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="여기에 적어주세요"
          style={styles.inputBox}
          value={myTextInput}
          onChangeText={onChangeInput}
        />
        
        <TouchableOpacity style={styles.button} onPress={onAddTextInput}>
          <Text style={styles.buttonText}>{editIndex !== -1 ? '수정' : '추가'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {myTextInputs.map((item, idx) => (
          <View style={styles.listview} key={idx}>               
            <View>   
              <Text style={styles.textstyle}>{item}</Text>
              <Text >{inputTime[idx].toLocaleString()}</Text>
            </View>

            <View style={styles.buttonContainer}>   
              <TouchableOpacity onPress={() => onStar(idx)}>
                <Text style={{ color: starColors[idx], fontSize: 20}}>★</Text> 
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item, idx)}>
                <Text style={{ color: "white" }}>수정</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(idx)}>
                <Text style={{ color: "white" }}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  textView: {
    backgroundColor: '#ff0066',
    height: 80,
  },
  mainText: {
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    height: 40,
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#22b8cf',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 60,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  listview: {
    borderWidth: 2,
    height: 60,
    justifyContent: "space-between",
    borderColor: "maroon",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textstyle: {
    fontSize: 16,
    color: "maroon",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 60
  },
  deleteButton: {
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 60
  }
});