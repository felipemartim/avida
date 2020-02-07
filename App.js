import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ViewPager from '@react-native-community/viewpager';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      quiz: [
        { question: "Você gosta mais de batata ou de estudar?"},
        { question: "Você curte birita?"},
        { question: "Você curte bola gato?"},
        { question: "Você já usou drogas pesadas?"},
        { question: "Você ouve roque paulera?"},
        { question: "Você sai pra night?"},
      ],
    };

    this.viewPager = React.createRef();
  }

  onPageSelected = (e) => {
    this.setState({ page: e.nativeEvent.position });
  };

  move = (delta) => {
    const page = this.state.page + delta;
    this.go(page);
  };

  go = (page) => {
    this.viewPager.current.setPage(page);
  };

  renderPage(item, index) {
    return (
      <View style={styles.page} key={index}>
        <Text style={styles.question}>{item.question}</Text>
        { index < this.state.quiz.length -1 ? 
          <Button title="Seguir" onPress={() => this.move(1)}/>
          : null
        }
        { index > 0 ? 
          <Button title="Voltar" onPress={() => this.move(-1)}/>
          : null
        }
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <ViewPager 
          ref={this.viewPager} 
          style={styles.viewPager} 
          initialPage={0} 
          scrollEnabled={false}
          onPageSelected={this.onPageSelected}
        >
        {this.state.quiz.map((q, i) => this.renderPage(q, i))}
        </ViewPager>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
  }
});
