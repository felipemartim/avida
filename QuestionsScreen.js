import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export default function Questions({ questions }) {

    const [ page, setPage ] = useState(0);

    const viewPager = React.createRef();

    onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    move = (delta) => {
        go(page + delta);
    };

    go = (page) => {
        viewPager.current.setPage(page);
    };

    renderPage = (item, index) => {
        return (
            <View style={styles.page} key={index}>
            <Text style={styles.question}>{item.question}</Text>
            { index < questions.length -1 ? 
                <Button title="Seguir" onPress={() => move(1)}/>
                : null
            }
            { index > 0 ? 
                <Button title="Voltar" onPress={() => move(-1)}/>
                : null
            }
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <ViewPager 
                ref={viewPager} 
                style={styles.viewPager} 
                initialPage={0} 
                scrollEnabled={false}
                onPageSelected={onPageSelected}
                >
                {questions.map((q, i) => renderPage(q, i))}
            </ViewPager>
        </View>
    )
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
      margin: 30,
    }
  });
  