import React, { useState, useCallback } from 'react';
import ViewPager from '@react-native-community/viewpager';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, CheckBox } from '@ui-kitten/components';
import { depressao } from './depressao'
import { diabetes } from './diabetes'

const BackIcon = (style) => (
    <Icon {...style} name='arrow-back' />
);

export default function Questions({ type, navigation }) {

    const [ page, setPage ] = useState(0);

    const viewPager = React.createRef();

    let questions = []
    switch(type) {
        case 'depressao': questions = depressao;
        break;
        case 'diabetes': questions = diabetes;
        break;
    }

    const navigateBack = () => (
        page == 0 ? navigation.pop() : move(-1)
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    move = (delta) => {
        go(page + delta);
    };

    go = (page) => {
        viewPager && viewPager.current && viewPager.current.setPage(page);
    };

    renderAnswerButton = (item, index) => {
        return (
            <Button 
                style={styles.button}
                key={index} 
                onPress={() => move(1)} 
                appearance='outline' 
                status='basic'>
                {item}
            </Button>
        )
    }

    const useCheckboxChanges = (initialCheck = false) => {
        const [checked, setChecked] = useState(initialCheck);
      
        const onChange = (isChecked) => {
          setChecked(isChecked);
        };
      
        return {
          checked,
          onChange,
        };
      };

    const getCheckboxes = (question) => {
        
        return question.answers.map((answer, i) => (
            <Layout key={i+100} style={styles.checkboxContainer}>
                <CheckBox
                    key={i}
                    style={styles.checkbox}
                    status='basic'
                    text={answer}
                    {...useCheckboxChanges()}
            /> 
            </Layout>
        ));
    };

    renderPage = (item, index) => {
        return (
            <Layout style={styles.page} key={index}>
                <Text style={styles.question} category='h3'>{item.question}</Text>
                <Layout style={styles.buttonsContainer}>
                    {item.type == 'multiple' ? 
                        getCheckboxes(item) : item.answers.map((a, i) => renderAnswerButton(a, i))
                    }
                </Layout>
                    {item.type == 'multiple' ? <Button onPress={() => move(1)}>Prosseguir</Button> : null}
            </Layout>
        );
    }   
    
    return (
        <SafeAreaView style={styles.safeContainer}>
            <TopNavigation alignment='center' leftControl={BackAction()}/>
            <ViewPager 
                ref={viewPager} 
                style={styles.viewPager} 
                initialPage={0} 
                scrollEnabled={false}
                onPageSelected={onPageSelected}
                >
                {questions.map((q, i) => renderPage(q, i))}
            </ViewPager>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    viewPager: {
      flex: 1,
    },
    buttonsContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    page: {
      justifyContent: 'space-around',
    //   alignItems: 'center',
    },
    question: {
      margin: 25,
    },
    button: {
        margin: 3,
        textAlign: 'right',
    },
    checkbox: {
        margin: 6,
        marginLeft: 20,
    },
    checkboxContainer: {
        // borderWidth: 1,
    }
  });
  