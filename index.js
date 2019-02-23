/**
 * react-native-cedar-maps-autoComplete
 * cedar maps place autoCompare component for react native, it works on iOS and Android
 * https://github.com/bashirpour/react-native-cedar-maps-autocomplete
 * Email:bashirpour4@gmail.com
 * Blog:http://www.bashirpour.ir
 * @flow
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import CedarScale from './utils';


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default class CedarMapsAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            result: null,
            renderedResults: null,
            loading: false
        };
    }

    static propTypes = {

        accessToken: PropTypes.string.isRequired,
        limitBoundry: PropTypes.object,
        loadingText: PropTypes.string,
        notFoundText: PropTypes.string,
        errorText: PropTypes.string,
        activityIndicatorColor: PropTypes.string,
        placeholder: PropTypes.string,
        returnKeyType: PropTypes.string,
        autoFocus: PropTypes.bool,
        hasDescriptionAddress: PropTypes.bool,
        hasLabel: PropTypes.bool,
        hasSearchIcon: PropTypes.bool,
        minLength: PropTypes.number,
        renderRightButton: PropTypes.element,
        renderLeftButton: PropTypes.element,

        //style
        mainContainerStyle: PropTypes.object,
        resultItemContainerStyle: PropTypes.object,
        navbarContainerStyle: PropTypes.object,
        loadingTextStyle: PropTypes.object,
        placeholderTextStyle: PropTypes.object,
        searchIconStyle: PropTypes.object,
        textInputStyle: PropTypes.object,
        labelContainerStyle: PropTypes.object,
        labelImageStyle: PropTypes.object,
        labelTextStyle: PropTypes.object,
    };
    static defaultProps = {
        loadingText: "در حال جستجو ...",
        notFoundText: "نتیجه ای پیدا نشد!",
        errorText: "متاسفانه درخواست شما با مشکل مواجه شده است!",
        activityIndicatorColor: "#28559b",
        placeholder: "جستجوی ناحیه",
        returnKeyType: "search",
        autoFocus: true,
        hasDescriptionAddress: true,
        hasLabel: true,
        hasSearchIcon: true,
        minLength: 2,
    }


    fetchData = () => {
        if (this.state.searchText.length >= this.props.minLength) {
            let lb = this.props.limitBoundry;
            let url = "https://api.cedarmaps.com/v1/geocode/cedarmaps.streets/";
            url += this.state.searchText + ".json?access_token=" + this.props.accessToken;

            if (this.props.limitBoundry)
                url += "&ne=" + lb.ne.lat + "," + lb.ne.lng + "&sw=" + lb.sw.lat + "," + lb.sw.lng;

            this.setState({loading: true});
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loading: false});
                    if (responseJson.status === "OK") {
                        this.setState({result: responseJson.results}, () => this._renderResult());
                    } else {
                        let renderedResults = <Text style={styles.notFoundText}>{this.props.notFoundText}</Text>;
                        this.setState({renderedResults})
                    }

                })
                .catch((error) => {
                    let renderedResults = <Text style={styles.errorText}>{this.props.errorText}</Text>;
                    this.setState({renderedResults, loading: false})
                })
        }

    }

    _renderResult() {
        let renderedResults = this.state.result.map((item, key) => {
            let img = require('./assets/icons/icon_street.png');
            let label = null;
            switch (item.type) {
                case 'street':
                    img = require('./assets/icons/icon_street.png');
                    label = 'خیابان';
                    break;
                case 'boulevard':
                    img = require('./assets/icons/icon_boulevard.png');
                    label = 'بلوار';
                    break;
                case 'roundabout':
                    img = require('./assets/icons/icon_roundabout.png');
                    label = 'میدان';
                    break;
                case 'locality':
                    img = require('./assets/icons/icon_locality.png');
                    label = 'محله';
                    break;
                case 'freeway':
                    img = require('./assets/icons/icon_freeway.png');
                    label = 'آزادراه';
                    break;
                case 'expressway':
                    img = require('./assets/icons/icon_freeway.png');
                    label = 'اتوبان';
                    break;
                case 'motorway':
                    label = 'اتوبان';
                    img = require('./assets/icons/icon_motorway.png');
                    break;
                case 'place':
                    label = 'مکان';
                    img = require('./assets/icons/icon_place.png');
                    break;
                case 'city':
                    label = 'شهر';
                    img = require('./assets/icons/icon_place.png');
                    break;
            }

            return (
                <View key={item.id} style={{width: "100%"}}>
                    <TouchableOpacity
                        style={[styles.itemTouchableOpacity, this.props.resultItemContainerStyle]}
                        onPress={() => this._selectItem(key)}
                    >
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressTitle}>{item.name} {item.components.city}</Text>
                            {this.props.hasDescriptionAddress &&
                            <Text style={styles.addressDescription}>{item.address}</Text>}
                        </View>
                        {this.props.hasLabel &&
                        <View style={[styles.labelContainer, this.props.labelContainerStyle]}>
                            <Image
                                source={img}
                                style={[styles.labelImage, this.props.labelImageStyle]}
                                resizeMode={"contain"}
                            />
                            <Text style={[styles.labelStyle, this.props.labelTextStyle]}>{label}</Text>
                        </View>}

                    </TouchableOpacity>
                </View>
            )
        });
        this.setState({renderedResults});

    }

    _selectItem(key) {
        let item = this.state.result[key];

        let center = item.location.center;
        center = center.split(",");
        let lat = center[0];
        let lng = center[1];

        let ne = item.location.bb.ne;
        let sw = item.location.bb.sw;
        ne = ne.split(",");
        sw = sw.split(",");


        const latDelta = ne[0] - sw[0];
        const lngDelta = latDelta * ASPECT_RATIO;

        let coordinate = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        };
        this.props.onSelect(coordinate);

    }

    _renderNavbar() {
        return (
            <View style={{flex: 1}}>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={[styles.textInput, this.props.textInputStyle]}
                    clearButtonMode="while-editing"
                    returnKeyType={this.props.returnKeyType}
                    autoFocus={this.props.autoFocus}
                    onChangeText={(searchText) => {
                        this.setState({searchText}, () => this.fetchData())
                    }}
                    ref={(ref) => this._textInput = ref}
                />
                {!this.state.searchText &&
                <TouchableOpacity
                    style={styles.placeholderContainer}
                    onPress={() => this._textInput.focus()}
                >
                    <Text
                        style={[styles.placeholderText, this.props.placeholderTextStyle]}>{this.props.placeholder}</Text>
                    {this.props.hasSearchIcon &&
                    <Image resizeMode={"contain"} style={[styles.searchIcon, this.props.searchIconStyle]}
                           source={require('./assets/icons/search.png')}/>}
                </TouchableOpacity>}
            </View>
        );
    }

    _renderLoading() {
        return (
            <View style={styles.loadingView}>
                <Text style={[styles.loadingText, this.props.loadingTextStyle]}>{this.props.loadingText}</Text>
                <ActivityIndicator
                    size="small"
                    color={this.props.activityIndicatorColor}
                    style={styles.activityIndicator}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.mainContainer, this.props.mainContainerStyle]}>
                <View style={[styles.navbarContainer, this.props.navbarContainerStyle]}>
                    {this.props.renderRightButton}
                    {this._renderNavbar()}
                    {this.props.renderLeftButton}
                </View>
                <ScrollView style={styles.bodyContainer}>
                    {this.state.loading && this._renderLoading()}
                    {this.state.renderedResults}
                </ScrollView>
            </View>
        );
    }


}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    navbarContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2d92e8",
        padding: CedarScale.size.s10 * .6

    },
    textInput: {
        borderRadius: CedarScale.size.s10 * .6,
        borderColor: "#dde7f2",
        color: "#dbe8f9",
        fontSize: CedarScale.fonts.sizes.h6,
        borderWidth: 1,
        //backgroundColor: CedarScale.colors.main.base,
        height: CedarScale.size.s50,
        marginTop: 0,
        paddingHorizontal: CedarScale.size.s10,
        textAlign: "right",
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: "#f5f3f3"
    },
    labelContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: CedarScale.size.s20
    },
    labelImage: {
        width: CedarScale.size.s35,
        height: CedarScale.size.s35
    },
    loadingView: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: CedarScale.size.s20
    },
    loadingText: {
        color: "#1b396c",
        fontSize: CedarScale.fonts.sizes.s5,
        flex: 1
    },
    activityIndicator: {
        marginVertical: CedarScale.size.s10
    },
    searchIcon: {
        width: CedarScale.size.s30,
        height: CedarScale.size.s30,
        tintColor: "#fff",
    },
    placeholderContainer: {
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        paddingHorizontal: CedarScale.size.s10,
        alignItems: "center"
    },
    placeholderText: {
        color: "#dbe8f9",
        fontSize: CedarScale.fonts.sizes.s2
    },
    notFoundText: {
        color: "#5a5a5a",
        fontSize: CedarScale.fonts.sizes.s4,
        flex: 1,
        textAlign: "center",
        padding: CedarScale.size.s30
    },
    errorText: {
        color: "#5a5a5a",
        fontSize: CedarScale.fonts.sizes.s4,
        flex: 1,
        textAlign: "center",
        padding: CedarScale.size.s30
    },
    itemTouchableOpacity: {
        paddingVertical: CedarScale.size.s10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#bebcbc",
        borderBottomWidth: 1,
    },
    addressTitle: {
        color: "#303030",
        fontSize: CedarScale.fonts.sizes.s1,
        textAlign: "right",
        flex: 1
    },
    addressDescription: {
        color: "#6e6e6e",
        fontSize: CedarScale.fonts.sizes.s4,
        textAlign: "right",
        flex: 1
    },
    addressContainer: {
        flex: 1,
        paddingRight: CedarScale.size.s15
    },
    labelStyle: {
        color: "#6e6e6e",
        fontSize: CedarScale.fonts.sizes.s3,
    }

});


