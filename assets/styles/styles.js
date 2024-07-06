import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
    absoluteFillObject: {
        position: 'absolute',
        left: 700,
        height: 500,
        right: 0,
        top: 80,
        bottom: 100, // Adjust this value as needed
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallTitle: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 30,
        marginBottom: 480,
    },
    menuButton: {
        alignSelf: 'flex-start',
        width: '15%',
        height: 50,
        marginLeft: 50,
        backgroundColor: '#675a8d',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        left: 50,
        top: 250,
        width: '15%',
        height: 40,
        backgroundColor: '#0089DA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText: {
        paddingRight: 20,
        paddingLeft: 10,
        color: 'black',
        fontSize: 23,
    },
    input: {
        width: '60%',
        left: 30,
        height: 50,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontSize: 23,
    },
});
