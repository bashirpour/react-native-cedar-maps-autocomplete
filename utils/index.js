import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const scaleVertical = size => height / guidelineBaseHeight * size;
const scaleModerate = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

const FontBaseValue = scale(18);

export const CedarScale = {
    colors: {
        light: "#fff",
    },
    fonts: {
        sizes: {
            h0: scale(32),
            h1: scale(26),
            h2: scale(24),
            h3: scale(20),
            h4: scale(18),
            h5: scale(16),
            h6: scale(15),
            p1: scale(16),
            p2: scale(15),
            p3: scale(15),
            p4: scale(13),
            s1: scale(15),
            s2: scale(13),
            s3: scale(13),
            s4: scale(12),
            s5: scale(12),
            s6: scale(13),
            s7: scale(10),
            base: FontBaseValue,
            small: FontBaseValue * .8,
            medium: FontBaseValue,
            large: FontBaseValue * 1.2,
            xlarge: FontBaseValue / 0.75,
            xxlarge: FontBaseValue * 1.6,
        },
        lineHeights: {
            medium: 18,
            big: 24
        },
    },
    size: {
        s5: scale(4),
        s10: scale(8),
        s15: scale(12),
        s20: scale(16),
        s25: scale(20),
        s30: scale(24),
        s35: scale(28),
        s40: scale(32),
        s50: scale(40),
        s100: scale(80),
        s200: scale(160),
    }
};



export default CedarScale;
