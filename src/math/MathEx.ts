/**
 * Created by yaozh on 2017/6/13.
 */
export default class MathEx
{
    public static DEG2RAD:number =  Math.PI / 180;
    public static RAD2DEG:number =  180 / Math.PI;

    public static generateUUID () :string
    {
        // http://www.broofa.com/Tools/Math.uuid.htm

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
        var uuid = new Array( 36 );
        var rnd = 0, r;

        for ( var i = 0; i < 36; i ++ ) {

            if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

                uuid[ i ] = '-';

            } else if ( i === 14 ) {

                uuid[ i ] = '4';

            } else {

                if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

            }

        }

        return uuid.join( '' );
    }

    public static clamp ( value, min, max ) :number
    {
        return Math.max( min, Math.min( max, value ) );
    }

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    public static euclideanModulo ( n, m ) :number
    {
        return ( ( n % m ) + m ) % m;
    }

    // Linear mapping from range <a1, a2> to range <b1, b2>

    public static mapLinear ( x, a1, a2, b1, b2 ):number
    {
        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
    }

    // https://en.wikipedia.org/wiki/Linear_interpolation

    public static lerp ( x, y, t ):number
    {
        return ( 1 - t ) * x + t * y;
    }

    // http://en.wikipedia.org/wiki/Smoothstep

    public static smoothstep ( x, min, max ) :number
    {
        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * ( 3 - 2 * x );
    }

    public static smootherstep ( x, min, max ):number
    {
        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * x * ( x * ( x * 6 - 15 ) + 10 );
    }

    // Random integer from <low, high> interval

    public static randInt ( low, high ):number
    {
        return low + Math.floor( Math.random() * ( high - low + 1 ) );
    }

    // Random float from <low, high> interval

    public static randFloat ( low, high ):number
    {
        return low + Math.random() * ( high - low );
    }

    // Random float from <-range/2, range/2> interval

    public static randFloatSpread ( range ):number
    {
        return range * ( 0.5 - Math.random() );
    }

    public static degToRad ( degrees ) :number
    {
        return degrees * MathEx.DEG2RAD;
    }

    public static radToDeg ( radians ):number
    {
        return radians * MathEx.RAD2DEG;
    }

    public static isPowerOfTwo ( value ):boolean
    {
        return ( value & ( value - 1 ) ) === 0 && value !== 0;
    }

    public static nearestPowerOfTwo ( value ) :number
    {
        return Math.pow( 2, Math.round( Math.log( value ) / Math.LN2 ) );
    }

    public static nextPowerOfTwo ( value ) :number
    {
        value --;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value ++;

        return value;
    }
}