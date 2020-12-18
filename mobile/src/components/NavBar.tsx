import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, } from 'react-native';
import { TouchableOpacity as Touchable } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native';
import menu from '../assets/menu.png';
import { nav, text } from '../styles';
import { doLogout, isAuthenticated } from '../services/auth';


const NavBar: React.FC = () => {

    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();


    const navigate = (path: any) => {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    const logged = async () => {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    const logout = () => {
        doLogout();
        navigation.navigate("Login");
    }

    useEffect(() => {
        logged();
    }, []);

    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={nav.logoutBtn}
                    >
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) :
                    (
                        <TouchableOpacity activeOpacity={0.5} style={nav.drawer} onPress={() => setShow(!show)}>
                            <Image source={menu} />
                            {
                                show ? (
                                    <View style={nav.options}>
                                        <Touchable
                                            style={nav.option}
                                            onPress={() => navigate("Home")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Home" ? nav.textActive : null
                                                ]}
                                            >
                                                Home
                                            </Text>
                                        </Touchable>
                                        <Touchable
                                            style={nav.option}
                                            onPress={() => navigate("Catalog")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Catalog" ? nav.textActive : null
                                                ]}
                                            >
                                                Catalogo
                                            </Text>
                                        </Touchable>
                                        <Touchable
                                            style={nav.option}
                                            onPress={() => navigate("Login")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Admin" ? nav.textActive : null
                                                ]}>
                                                ADMIN
                                            </Text>
                                        </Touchable>

                                    </View>) : null
                            }
                        </TouchableOpacity>
                    )
            }
        </>

    )
}


export default NavBar;