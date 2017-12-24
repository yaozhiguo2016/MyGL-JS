#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

float pi = 3.1415926;
float tau = pi * 2.0;

vec2 Rotate(vec2 uv,float angle);

float Circle(vec2 uv,float r);
float Rect(vec2 uv,vec2 size,float r);
float Line(vec2 uv,vec2 start,vec2 end,float r);
float Merge(float a,float b);
float Outline(float a,float r);

vec3 Blend(vec3 backColor, vec3 shapeColor, float shape);

void main( void )
{
    vec2 res = resolution / resolution.y;
    vec2 uv = ( gl_FragCoord.xy / resolution.y );
    uv -= res / 2.0;

    float secAng = (time / 60.0) * tau;
    float minAng = (time / 3600.0) * tau;
    float hourAng = (time / 43200.0) * tau;

    float clockFace = Circle(uv, 0.45);
    float clockTrim = Outline(clockFace, 0.01);

    vec2 secDomain = Rotate(uv, secAng);
    float clockSec = Line(secDomain, vec2(0.0, -0.15), vec2(0.0, 0.35), 0.001);
    clockSec = Merge(clockSec, Circle(uv, 0.01));
    clockSec = Merge(clockSec, Rect(secDomain - vec2(0.0, -0.08), vec2(0.012, 0.07), 0.0));

    float clockMin = Line(Rotate(uv, minAng), vec2(0.0,-0.08), vec2(0.0, 0.35), 0.005);
    float clockHour = Line(Rotate(uv, hourAng), vec2(0.0,-0.05), vec2(0.0,0.3), 0.007);
    clockHour = Merge(clockHour, Circle(uv, 0.02));

    float tickMarks = 1.0;
    vec2 tickDomain = uv;
    for(int i = 0;i < 60;i++)
    {
        tickDomain = Rotate(tickDomain, tau / 60.0);
        vec2 size = (mod(float(i + 1), 5.0) == 0.0) ? vec2(0.08, 0.01) : vec2(0.04, 0.002);
        tickMarks = Merge(tickMarks, Rect(tickDomain - vec2(0.38, 0.0), size, 0.0));
    }

    vec3 faceColor = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0), uv.x+0.5);
    vec3 trimColor = mix(vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0), uv.y + 0.5);
    vec3 secColor = vec3(1.0, 0.0, 0.0);
    vec3 handColor = vec3(0.0, 0.0, 0.0);

    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0), uv.y+0.5);
    color = Blend(color, faceColor, clockFace);
    color = Blend(color, trimColor, clockTrim);
    color = Blend(color, trimColor, tickMarks);
    color = Blend(color, handColor, clockHour);
    color = Blend(color, handColor, clockMin);
    color = Blend(color, secColor, clockSec);

    gl_FragColor = vec4(color, 1.0);
}
float Line(vec2 uv,vec2 start,vec2 end,float r)
{
    return Rect(uv-(end+start)/2.0, vec2(r, end.y - start.y), r);
}
float Rect(vec2 uv,vec2 size,float r)
{
    return length(uv - clamp(uv, -size/2.0, size/2.0)) - r;
}
vec2 Rotate(vec2 uv,float angle)
{
    return mat2(cos(angle), sin(angle),-sin(angle), cos(angle)) * uv;
}
float Circle(vec2 uv,float r)
{
    return length(uv) - r;
}
float Merge(float a,float b)
{
    return min(a, b);
}
float Outline(float a,float r)
{
    return abs(a) - r;
}
vec3 Blend(vec3 backColor, vec3 shapeColor, float shape)
{
    return mix(shapeColor, backColor, smoothstep(0.0, 0.005, shape));
}