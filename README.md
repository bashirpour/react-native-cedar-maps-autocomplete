# react-native-cedar-maps-autocomplete
Customizable `Cedar Maps` autocomplete component for iOS and Android React-Native apps

### Preview

![]()

### Installation

```npm install react-native-cedar-maps-autocomplete --save```


### Example

```jsx
import CedarMapsAutoComplete from "react-native-cedar-maps-autocomplete";

render() {
    return (
        <CedarMapsAutoComplete

            accessToken="YOUR_ACCESS_TOKEN"

            // For example limit for tehran
            limitBoundry={{
                ne: {
                    lat: "35.9390956",
                    lng: "51.788907",
                },
                sw: {
                    lat: "35.5214856",
                    lng: "51.0890007",
                },
            }}


            minLength={2} // minimum length of text to search
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            autoFocus={true}
            hasDescriptionAddress={true}
            hasLable={true}
            hasSearchIcon={true}

            placeholder='جستجوی ناحیه'
            loadingText="در حال جستجو ..."
            notFoundText="نتیجه ای پیدا نشد!"
            errorText="متاسفانه درخواست شما با مشکل مواجه شده است!"
            activityIndicatorColor={"#323232"}


            onSelect={(coordinate) => console.log(coordinate)}


            renderRightButton={<Text>RIGHT_BTN</Text>}
            renderLeftButton={<Text>LEFT_BTN</Text>}


            //style
            mainContainerStyle={{}}
            resultItemContainerStyle={{}}
            navbarContainerStyle={{}}
            loadingTextStyle={{}}
            placeholderTextStyle={{}}
            searchIconStyle={{}}
            textInputStyle={{}}
            labelContainerStyle={{}}
            labelImageStyle={{}}
            labelTextStyle={{}}


        />

    );
}

```


### Styling

```CedarPlacesAutocomplete``` can be easily customized to meet styles of your  app. Pass styles props to ```CedarPlacesAutocomplete``` with style object for different elements (keys for style object are listed below)

| key | type |
| ---- | ---- |
| mainContainerStyle | object (View) |
| resultItemContainerStyle | object (Text style) |
| navbarContainerStyle | object (View style) |
| loadingTextStyle | object (style) |
| placeholderTextStyle | object (View style) |
| searchIconStyle | object (ListView style) |
| textInputStyle | object (Text style) |
| labelContainerStyle | object (View style) |
| labelImageStyle | object (Image style) |
| labelTextStyle | object (View style) |




### Features

- [x] Places autocompletion
- [x] iOS and Android compatibility


### Changelog
- 1.0.0 : Initial commit.



### License

[MIT](LICENSE)

### Authors

- [Mahdi Bashirpour](https://www.twitter.com/bashirpour)