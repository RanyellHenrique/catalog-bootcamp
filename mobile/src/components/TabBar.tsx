import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { tabbar } from '../styles';

interface TabBarProps {
    screen: string;
    setScreen: Function
}

const TabBar: React.FC<TabBarProps> = (props) => {

    const { screen, setScreen } = props;

    const changeScreen = (page: string) => {
        setScreen(page);
    }

    return (
        <View style={tabbar.container}>
            <TouchableOpacity
                style={[tabbar.pill, screen === 'products' && tabbar.pillActive]}
                onPress={() => changeScreen('products')}
            >
                <Text style={[tabbar.pillText, screen === 'products' && tabbar.pillTextActive]}>
                    Produtos
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[tabbar.pill, screen === 'categories' && tabbar.pillActive]}
                onPress={() => changeScreen('categories')}
            >
                <Text style={[tabbar.pillText, screen === 'categories' && tabbar.pillTextActive]}>
                    Categorias
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[tabbar.pill, screen === 'users' && tabbar.pillActive]}
                onPress={() => changeScreen('users')}>
                <Text style={[tabbar.pillText, screen === 'users' && tabbar.pillTextActive]}>
                    usuários
                </Text>
            </TouchableOpacity>
        </View>
    );
}


export default TabBar;