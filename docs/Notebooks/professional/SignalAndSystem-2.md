# 信号与系统下半

## 离散时间傅里叶级数(DFS)

Discrete fourier series

信号与系统其实不考这个，这个放在数字信号处理，但是胡浩基老师觉得很有价值所以讲了。这个在生物医学信号处理是重点

傅里叶级数FS是从连续x(t)到离散$a_k$，连续时间傅里叶变换是从连续x(t)到连续X(jω)，离散时间傅里叶变换是从离散x\[n\]到连续$X(e^{j\omega})$，还差一个就是从离散x\[n]到离散$a_k$的离散信号傅里叶级数。之所以要引入离散信号傅里叶级数是因为计算机只能处理离散的数据

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021614667.png)

离散对应周期，比如傅里叶级数a_k是离散的，对应x(t)是周期的，而离散时间傅里叶变换的x\[n]是离散的，对应$X(e^{j\omega})$是周期的

离散傅里叶级数的定义

$$
a_k=\sum\limits_{n=0}^{N-1}x[n]e^{-j\frac {2\pi} N nk}
$$

除了记作a_k，也有写成X\[k]的情况

$$
x[n]=\frac 1 N \sum\limits_{k=0}^{N-1}a_ke^{j\frac {2\pi} N nk}
$$

是在用$e^{\large{j\frac {2\pi} N nk}}$作为基底来表示，而这个东西显然关于N是周期的，而它表示出来的x\[n]，也是以N为周期的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021626071.png)

### FFT

FFT是用来加速DFS求值的一种算法，时间复杂度为O(NlogN)，比直接解方程的复杂度低，本质上是用了分治策略

一个n-1次多项式f(x)可以用n个不同的点来表示，如(x_1, f(x_1)), ..., (x_n, f(x_n))，这n个点可以任选，我们希望以最快的速度得到这n个点的函数值。一个一个带入在小的集合上有用，但时间复杂度较高。为了加速，我们引入FFT。FFT的思想是，将多项式按奇偶项分成子多项式，对子多项式可以继续往下分，直到分到最底层只有两项的多项式c0+c1x。随后只需要直接代入1和-1这两个点得到值，然后经过系数的组合得到4项的多项式在1，j，-1, -j的值，然后继续往上表示8项的，直到把最顶层的都表示出来，于是就可以得到原来的所有的点的函数值。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021631880.png)

这是表示FFT算法的蝴蝶图，通过底层的求值经过组合得到a_k

这里只是介绍了最经典的库利-图基的radix-2算法，经过发展还有混合基FFT，实FFT，chirp-Z变换等推广，这里不展开，可以自行了解。

### DFS和DTFT的关系

$a_k$是$X(e^{j\omega})$在0到2pi上的均匀采样，其实这一点和FS之于CTFT的关系是一样的。“用傅里叶变换求周期信号的傅里叶级数”那一节讲到，如果想要求周期信号的傅里叶级数，可以先求一个周期内的信号的傅里叶变换（只保留那个周期内的值，其余部分均让信号为0），然后用$a_k=\frac 1 TX(k\omega_0)$，即可得到指数形式的FS的系数

想要得到DFS的系数a_k，只需要对周期序列的一个周期（N）内的信号做DTFT，然后在0到2pi上从0开始间隔2pi/N，取N个点即可，这N个点的值就是DFS的结果，不需要除以什么东西

后续在BSP部分会补充DFS这块更详细的内容，此处因为还没有讲采样所有先不展开

### 用FFT计算两个序列的卷积

先定义循环移位，比如说一个长度为N的序列往右移动一位就是把原本是最后一个的N-1放最前面，然后其余的往右移动，像是8051的RR指令。然后表达长度为N的序列循环右移m次就用x\[(n-m)N]表示

不过这种说法在具体计算的时候比较难表达，更加容易的方式是你就看括号里的东西是几，然后对它取模，限制在0到N-1的范围内，再根据原来的序列就能得到它的值

比如x\[n]=\[1, 2, 0, -1]，我想要得到x\[-1]，那就相当于取原来的x\[3]

然后定义两个N点序列的循环卷积，注意离散的循环卷积只能作用于两个长度相同的序列

循环卷积就是圆卷积，有连续和离散两个版本，和一开始学的线性卷积不一样。

$$
y[n]=x[n]\circledast h[n]=\sum\limits_{m=0}^{N-1}x[m]h[(n-m)N]
$$

其实完全可以先算线性卷积再求圆周卷积。线性卷积方法已经明显，就是列表然后副对角线方向求和。而要得到圆周卷积，比如这里模4，只需要把线性卷积结果里面下标模4相同的加起来即可。

比如这里(1,2,3,4)卷积(1,0,2,1)先进行线性卷积得到(1,2,5,9,8,11,4)，下标从0到6，那么下标为0和4的就加起来，也就是这里的1+8=9。然后下标为1和5的加起来，也就是这里的2和11加起来是13。然后下标为2和6的加起来，比如这里是5+4=9。接着下标为3的已经没有下标为7的了，所以就它自己，是9。这里圆周卷积的输入是两个相同长度的序列，输出也是相同长度的序列，知道这一点就行。

因为FFT算法比较快（对于大的数据计算而言），可以利用FFT来计算线性卷积。长度为L1和L2的序列做线性卷积的长度是L1+L2-1。第一步得要补0成长度为L1+L2-1的序列，因为循环卷积的长度和原来两个的长度是相同的。前面(1,2,3,4)卷积(1,0,2,1)的例子卷积完长度是7，于是需要补成(1,2,3,4,0,0,0)卷积(1,0,2,1,0,0,0)做圆周卷积，得到的结果就和线性卷积一样了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021651201.png)

对于人来说求正变换和反变换很慢，但是对计算机来说在大的数据上很快（相比直接线性卷积）。你在考试肯定还是用普通的卷积求法。

## 采样

采样是沟通连续与离散的桥梁

采样就是从连续信号中等间隔地记录值

![Snipaste_2026-07-02_16-59-14.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021659444.png)

$$
x[n]=x(nT)
$$

采样定理：如果x(t)是带限信号，即当$|ω|>ω_M$时X(jω)=0，如果采样频率$\omega_s>2\omega_M$,则x(t)可以由样本值序列x\[n]=x(nT)唯一确定，$T=2\pi/\omega_s$，$\omega_M$是带限信号截止频率

显然采样频率ωs越大，就越容易还原信号，因为采样频率大了那T就小了，采的点就越密集，获取的信息就越多

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021903351.png)

一个采样的结果可以还原出不同的可能性，比如14pi的情况就是比4pi的多一个周期的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021903487.png)

本质上是2kpi n无法分辨，在ω_M的表达式里2pi/T就是ω_s

务必注意从采样信号还原原来的信号有多解

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021904442.png)

带公式，x\[n]=x(nT)那一步不用操心，照常带进去就行，关键是题目给你的现成的表达式是要带2knpi的，这里不可以用2kpi不带n，这样是有问题的。为什么？题目要求寻找T使得sin(2000pi nT)=sin(npi/5+2kpi)，假设k任取，那么你得到的T=1/10000+k/1000n。但T是一个和n无关的东西，所以必须要把这个n约掉，所以要用nk，这样就剩下k/1000

### 采样定理三张图

采样定理的证明需要全部记住

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021904694.png)

核心就是这三张图，要对其中的表达式也要很清楚。注意这里冲激串采样的ω和序列采样的ω不是同一个ω，冲激串采样的那个ω是模拟角频率，还是对应现实频率，但是序列采样的那个ω是数字角频率，或者说归一化角频率

第一第二个是连续时间傅里叶变换，第三个是离散时间傅里叶变换

先推导第二张图

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021904626.png)

p(t)就是连续时间傅里叶变换最后那里讲到的周期冲激串，如果还记得的话就知道P(jω)是高度为2pi/T，间隔为ω0的周期函数了（间隔ω0对应时域的冲激串间隔T），这里T是$2\pi/\omega_s$，所以P(jω)间隔为ω_s

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021905717.png)

然后卷积就简单了，对δ卷积相当于复制一份，于是就可以画出②里右边的样子了。当然还配合了X(jω)的形状，如果①的变换是那样的话那②的图象就是画出来的那样

接下来看③的证明，主要是证明x\[n]的$X(e^{j\omega})=X_p(j\frac \omega T)$，这里只看变量ω变成了ω/T，也就是横坐标扩成了原来的T倍

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021905710.png)

到这一步之后$X_p$里的ω换成ω/T，最终的表达式就一样了

证明了$X(e^{j\omega})=X_p(j\frac \omega T)$，就可以直接根据$X_p(j\omega)$的图象然后扩大T倍就得到了$X(e^{j\omega})$

务必注意序列的ω是数字角频率，建议写成Ω。

我发现了一件惊人的事情，原来x\[n]序列和间隔为1高度为原来采样结果的冲激串的频域是相同的，只是一个用ω，一个用Ω

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021906244.png)

用间隔为1的冲激串进行采样之后做CTFT

$$ X_c(j\omega) = \int_{-\infty}^{\infty} \left( \sum_{n=-\infty}^{\infty} x[n]\delta(t-n) \right) e^{-j\omega t} dt = \sum_{n=-\infty}^{\infty} x[n]e^{-j\omega n} $$

序列采样做DTFT，为了区分，这里数字角频率用了Ω

$$ X(e^{j\Omega}) = \sum_{n=-\infty}^{\infty} x[n]e^{-j\Omega n} $$

可以看出，其实和CTFT表达式一样，只是自变量换了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021910383.png)

所以采样定理可以解决DTFT正变换的问题，可以把它变成对连续时域进行T=1采样得到的结果，于是你直接对时域相同表达式求CTFT之后直接把CTFT的按2pi混叠即可，没有任何其他的变化，因为此处的T=1，所以1/T=1，所以高度方面不需要调整，只需要注意自变量从模拟角频率

现在根据这个图再去看采样定理，想要表达的意思就是②里面的频域的那些是分开的，不发生混叠，才可以恢复原来的信号。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021911050.png)

$\omega_s-\omega_M>\omega_M$，也就是$\omega_s>2\omega_M$，就是采样定理提到的条件

把截止频率的两倍称为奈奎斯特采样频率，当采样频率为奈奎斯特采样频率的时候，不能保证一定能够还原，比如对sin

### 信号重建

接下来讲怎么通过采样还原原来的信号，公式叫做内插公式，所谓内插就是把离散的补全成连续的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021912412.png)

他这里从xp(t)开始推，然后把δ给弄到卷积那里去了，然后把x(nT)替换成x\[n]

这种形式的叫做低通内插，事实上如果X(jω)是另一种形式也可以得到相同的Xp(jω)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021914607.png)

在这种情况下想要还原，需要用另一个滤波器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021914502.png)

这种还原方式叫做带通内插

在这里科普滤波器的四种类型

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021914987.png)

低通和高通，带通和带阻是相反的关系，如果看成digital的，只有0和1的话

补充一个易错点，即使$\omega_s<2\omega_M$，也未必会发生混叠。关键在于带限信号的截止频率是定义为最外面的零点，在内部可以也有没有值的地方，可能刚好错开不会混叠

### 连续时间系统的离散实现

本质上是冲激响应不变法设计数字滤波器以及信号重建

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021932237.png)

模拟系统里，x(t)经过系统和h(t)卷积得到y(t)。现在我希望把x(t)间隔T采样得到的序列x\[n]送入离散系统和h\[n]卷积，并保证卷积后的结果y\[n]就是模拟系统里y(t)间隔T采样的结果，问题就是这个h\[n]怎么设计，它和h(t)的关系

冲激响应不变法是设计数字滤波器的一种方法，是已经有一个H(jω)（带限），你要得到h\[n]，有两种路径

路径一：

1. H(jω)做CTFT逆变换得到h(t)
2. 令h\[n]=Th(nT)得到h\[n]

路径二：

1. 令$H(e^{j\omega})=H(j\dfrac \omega T)$得到$H(e^{j\omega})$
2. 对$H(e^{j\omega})$做DTFT逆变换得到h\[n]

这两个路径得到的结果完全等价（在无混叠且时域没有δ(t)的情况下）

接下来要证明为什么是hd\[n]=Th(nT)，为什么要乘以T

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021932129.png)

这里展示了采样前后傅里叶变换的图象差异，并根据$X(e^{j\omega})$和$Y(e^{j\omega})$的图象反推$Hd(e^{j\omega})$的图象

而h(nT)的高度是Eh/T，为了实现这个图里的高度为Eh，所以需要乘以T

接下来展示怎么设计

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021933377.png)

注意数字微分器这个无法用Th(nT)得到，因为微分它本来就有δ'(t)，无法采样，这也说明其实上面两个路径并不完全等价，仅有部分时候可以混用。

这个我想到另一种方法，这里做逆变换不要这样套公式，要用积分性质。把带限jω视为jω乘以低通滤波器，对应时域就是δ'(t)卷积sin(ωct)/(pi t)，那你就对这个东西求导就好了，得到的就是上面的结果。这就是最快的计算方法，不要用套公式的方式分部积分算。


延时器（Delay）

连续频率响应为 $H_c(j\omega)=e^{-j\omega t_0}$。带限设计下，离散频率响应为：

$$
H_d(e^{j\Omega}) = H_c\left(j\frac{\Omega}{T}\right) = e^{-j(\Omega/T) t_0} = e^{-j\Omega (t_0/T)}, \qquad |\Omega| < \Omega_c
$$

求 $h_d[n]$ 的逆离散时间傅里叶变换：

$$
h_d[n] = \frac{1}{2\pi} \int_{-\Omega_c}^{\Omega_c} e^{-j\Omega (t_0/T)} e^{j\Omega n} d\Omega
= \frac{1}{2\pi} \int_{-\Omega_c}^{\Omega_c} e^{j\Omega (n - t_0/T)} d\Omega
$$

直接计算积分：

$$
h_d[n] = \frac{1}{2\pi} \cdot \frac{e^{j\Omega (n - t_0/T)}}{j(n - t_0/T)} \Bigg|_{-\Omega_c}^{\Omega_c}
= \frac{e^{j\Omega_c (n - t_0/T)} - e^{-j\Omega_c (n - t_0/T)}}{2\pi j (n - t_0/T)}
= \frac{\sin\left(\Omega_c (n - t_0/T)\right)}{\pi (n - t_0/T)}
$$

若 $n = t_0/T$（且 $t_0/T$ 为整数），取极限得该点值为：

$$
h_d[t_0/T] = \frac{\Omega_c}{\pi}
$$

### 采样例题

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021944178.png)

遇到这样的题，先根据周期冲激串确定采样周期和ωs，这里xs就是前面采样重点图里面的xp，xs=x(t)δT(t)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021944951.png)

第一题直接套结论，第二题需要小心，因为这是冲激函数而不是普通的，所以它的高度会随放缩变化，容易错，第三题就直接跳过了

在满足采样定理的时候（无混叠），可以直接从采样序列x\[n]的频谱还原x(t)的频谱，就取一个周期内的然后进行合适的横纵坐标缩放

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021945854.png)

一道比较特别的题目

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021946549.png)

涉及到能量需要想到帕斯瓦尔定理，出现x\[n]=x(nT)需要想到采样定理。这里首先通过直观理解，猜出可能可以通过采样信号的长乘宽来估算连续信号的能量

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021947184.png)

这里需要猜出条件是满足采样定理的条件，然后从离散那里开始，先用了离散的帕斯瓦尔定理把x\[n]的能量转到频率部分，然后根据x\[n]的频谱和x(t)频谱的关系，改成对X(jω)的积分，最后再用连续帕斯瓦尔定理转到连续信号的能量

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021947886.png)

这一题求出差分方程的H之后直接把e\^{jω}换成e\^{jωT}即可。注意一开始的ω是数字角频率，换掉之后的ω是模拟角频率。其实就是前面说的冲激响应不变法的频域变换现在换成从H(e^{jω})回到H(jω)而已，所以就是把ω换成ωT。凡是从数字设计模拟或者从模拟设计数字都是这样。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607021948681.png)

这个是冲激串采样，和序列采样不一样。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022003376.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022003468.png)

### 从采样看各个变换的关系

集大成的图，如果能理解以下几张图，那么信号与系统就算是理解充分了，如果能自己画出来，那就意味着充分熟悉。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607042134511.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607042132117.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607042131214.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607042216312.png)

这个图我考前自己画的

## 拉普拉斯变换(LT)

拉普拉斯变换Laplace Transform

学拉普拉普变换和z变换是为了设计滤波器

滤波器设计中的困难是怎么把无限、连续、非因果的理想滤波器优化为计算机可实现的有限、离散、因果的滤波器

### 定义

拉普拉斯变换是傅里叶变换的推广，因为可以进行傅里叶变换的函数有限制条件

傅里叶变换

$$
X(j\omega)=\int_{-\infty}^{+\infty}x(t)e^{-j\omega t}dt
$$

拉普拉斯变换

$$
X(s)=\int_{-\infty}^{+\infty}x(t)e^{-st}dt
$$

其实从这里就能看出其实傅里叶变换里的jω的j是有道理的，把jω替换成s就是拉普拉斯变换了。拉普拉斯变换和傅里叶变换的区别在于，那个e除了旋转之外还会缩小，从而解决傅里叶变换要求x(t)绝对可积的那个限制，因为它自己就会衰减，当然这也要求s在实部大于零的复平面取值。对于傅里叶变换得到的是实频域，对拉普拉斯变换得到的是复频域。这里的s=σ+jω，注意ω仅在j那里，ds=jdω，σ是一个常数

逆变换

$$
x(t)=\frac 1{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty}X(s)e^{st}ds, \sigma=Re(s)
$$

第一次学我有些疑问，这里的σ是常数还是变量？它被积分完还能留下吗，如果能留下那x还是t的函数吗，σ本身会不会成为一个自变量？

解释一下，这里的积分限其实是复平面里的一条竖线

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022004230.png)

在这条线上积分，也就是说拉普拉斯变换的基函数其实是$e^{st}=e^{\sigma t+j\omega t}$，那这里的σ究竟是多少，事实上σ是任取的，σ取0那就是在用$e^{j\omega t}$做基函数，这就是傅里叶变换，σ取1那就是用$e^{t+j\omega t}$做基函数。不管σ取哪个，用逆变换公式变换回去都能得到x(t)。

连续时间傅里叶变换就是取σ=0时的情况，从符号上就是把所有的s=σ+jω替换为jω

第二个疑问，复变里学的是从0开始积分，怎么这里是从-∞开始。其实这两种定义都可以，这种从负无穷积到正无穷的是双边拉普拉斯变换，从0开始的是单边拉普拉斯变换。其实对于因果信号来说，因果信号就是t<0均为0，这两种是一样的

在这个公式里，σ可以是全体实数，而不仅限于复变里讲的大于等于0，其实就是看收不收敛，如果能收敛的话取负的也没问题

### 重要拉普拉斯变换

$$
\begin{align}
e^{-at}u(t)&\overset{\mathcal{L}}\longrightarrow\frac 1 {s+a}(Re(s)>-Re(a))\\
-e^{-at}u(-t)&\overset{\mathcal{L}}\longrightarrow\frac 1 {s+a}(Re(s)<-Re(a))\\
\end{align}
$$

乘了u(t)其实单边和双边LT都是一样的，不过像是sin(ωt)，没有乘的话，如果是单边的是有收敛域的，就是复变那里学的，如果是双边那是不收敛的。计算拉氏变换必须考虑收敛域。注意这里a可以是实数也可以是复数

第一个公式的收敛于主要是看积分的时候正无穷那一项能不能变成0，不过更简单的看法就是什么样的$e^{-\sigma t}$能把它压到0，因为就是相当于多乘了一个衰减因子。

对于$e^{-at}u(t)$，它的极点就是它恰好不收敛的那个地方，理论上来说是一条线，就是Re(s)=-a那根线，不过极点仅指那个点(-a, 0)，代数上简单理解就是这个分式的无定义点，也就是分母为0的解

利用以上两个式子求$e^{-b|t|}$的拉普拉斯变换，这里要注意形状的关系和参数的正负性。我们先假设b>0，那么待求的式子就是一个从0两端往下的图象，现在要用这两个已有的拼出它。大于0的一侧比较简单，直接把第一个式子的a换成b即可，形状是一样的，比较麻烦的是t<0的情况。如果我们对第二个式子仍然让a>0，对应的图象应当是左边是往负无穷跑的，而不是预期的收敛到0，因此第二个a应该取负数，在b>0的情况下，令a=-b带入第二个式子，就可以得到一个负的衰减到0的图象，然后再整体变成正的就行，对应的拉普拉斯变换为$-\dfrac 1 {s-b}$，收敛域为Re(s) < b。这样两个拼起来，拉普拉斯变换为$\dfrac 1 {s+b}-\dfrac 1 {s-b}$，收敛域为-b < Re(s) < b。

你要知道$e^{-a|t|}=e^{-at}u(t)+e^{at}u(-t)$，然后分别带入上面公式就可以得到1/(s+a)-1/(s-a)了，收敛域|Re(s)|<|a|

然后反变换就比较麻烦了，要分类讨论，因为同一个1/(s+a)可以反变换成两种不同的形式，对应收敛域不同

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022005167.png)


### 收敛域性质

拉普拉斯变换的收敛域是有性质的，X(s)的收敛域是竖的带状区域，前提是x(t)连续且不包含奇异信号。这个其实很好理解，因为拉普拉斯变换就是用竖着的一条一条的来作为基函数的

另外就是满足绝对可积的时限信号（定义域有限）在整个s平面收敛

右边信号的收敛域在最右边极点的右边

如果把刚刚那道题改一下，改成因果信号x(t)，那答案就只有一个，因为因果信号一定是右边信号

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022005630.png)

左边信号的收敛域在最左边极点的左边

双边信号收敛域带状，双边信号就是定义域从负无穷到正无穷，双边信号可以拆成一个左边信号加一个右边信号，那两个收敛域取交集就是一个带状的

其实结合这几个性质再去看那几个例子就很容易记忆了

稳定信号的收敛域包含jω轴

这题有意思，只看收敛域

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022007951.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022007208.png)

我总结一下通过看零极点和收敛域来判断性质

极点个数大于等于零点，且收敛域往右，则信号因果

收敛域包含虚轴，则信号稳定

因果稳定信号的极点个数大于零点，且极点都在左半平面

一道比较有意思的题，让人想到高中题目，根分布问题

系统方程$\dfrac{ks}{s^2+(4-k)s+4}$，使得系统稳定的k的范围？（默认因果）

等价于分母的两个根都在左半平面内。用求根公式，$s_{1,2}=\dfrac {k-4\pm \sqrt{(4-k)^2-16}}{2}$

当根为实根，即(4-k)平方大于等于16，此时k≤0或k≥8。要使得两个根都在左半平面，则s1+s2<0，s1s2>0。由于s1s2=4，自动满足，只需要看s1+s2=k-4<0，此时k<4，与条件取交集得到k≤0

当根为复根，即(4-k)平方小于16，此时0<k<8，此时只需要看根的实部(k-4)/2<0，即k<4，所以取交集得到0<k<4

综上所述，k＜4

### 常用拉普拉斯变换

$$
\begin{align}
L[u(t)]&=\frac 1 s, Re(s)>0\\
L[e^{-at}u(t)]&=\frac 1 {s+a}, Re(s)>-Re(a)\\
L[t^n\ u(t)]&=\frac {n!} {s^{n+1}}, Re(s)>0\\
L[\sin t\ u(t)]&=\frac 1 {s^2+1}, Re(s)>0\\
L[\sin \omega t \ u(t)]&=\frac \omega {s^2+\omega^2}, Re(s)>0\\
L[\cos t\ u(t)]&=\frac s {s^2+1}, Re(s)>0\\
L[\cos \omega t\ u(t)]&=\frac s {s^2+\omega^2}, Re(s)>0\\
L[e^{j\omega t }\ u(t)]&=\frac 1 {s-j\omega}=\frac s {s^2+\omega^2}+j\frac {\omega}{s^2+\omega^2}, Re(s)>0\\
L[e^{-at}\cos(\omega_0 t)u(t)]&=\frac {s+a}{(s+a)^2+\omega_0^2}
\end{align}
$$

注意此处不能用实偶对实偶来看，因为这里根本就不是实偶函数，它是单边的。区分sin和cos的最好的方法是记忆e\^{jωt}，然后用欧拉公式对照一下就知道s的那个是cos的，而带j那一项是sin的

### 性质

线性性需要额外注意收敛域

线性组合之后，在R1∩R2以内一定收敛，在一些特殊情况下，比如计算结果为0，那收敛域也有可能扩大

时移性质

$$
x(t-t_0)\overset{\mathcal{L}}{\longrightarrow}e^{-st_0}X(s), 收敛域不变
$$

这里需要和连续时间傅里叶变换对比一下，连续时间傅里叶变换用的是和$e^{-j\omega t}$积分，所以t变成t-t0的时候多出来的是$e^{-j\omega t_0}$而不是$e^{-st_0}$

频移性质

$$
e^{at}x(t)\overset{\mathcal{L}}{\longrightarrow}X(s-a),收敛域变为R+Re(a)
$$

我先说一下收敛域，把x(t)到X(s)的收敛域设为R，而频移性质会导致新的收敛域会移动a的实部，比如a=1那收敛域就右移1。举个具体的例子，$e^{-t}u(t)\to \dfrac 1 {s+1}, u(t)\to \dfrac 1 {s}$，这里就是把s变成了s-1，于是时域乘以$e^t$，而收敛域从Re(s)>-1变成Re(s)>0，右移了1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022009139.png)

注意这个收敛域的变化，我觉得不应该把R当成集合而是应当当成σ轴上的那个值，毕竟收敛域都是带状的，所以只需要用实轴上交点的值来表达就行。那aR其实也就是把原来的点的值变成a倍。

时域微分

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022009153.png)

把jω替换为s，收敛域可能扩大

时域微分性质很好用，这意味着你只需要得到1/分母，就可以任意组合出其他的s/分母，s\^2/分母等

频域微分

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022010164.png)

其实还是和傅里叶变换一样的，把傅里叶变换那里的dω改成djω，配一下，把负号放到左边就和拉普拉斯变换一样了

卷积性质

$$
x_1(t)\ast x_2(t)\overset{\mathcal{L}}{\longrightarrow}X_1(s)X_2(s), 收敛域至少R_1\cap R_2
$$

初值和终值定理，注意这只针对因果信号

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022010399.png)

用复变那边的笔记来简单记录一下


$$
\begin{align}
对于L[f(t)]&=F(s)\\
线性L[\alpha_1f_1(t)+\alpha_2f_2(t)]&=\alpha_1F_1(s)+\alpha_2F_2(s)\\
时移L[f(t-t_0)]或L[u(t-t_0)f(t-t_0)]&=e^{-st_0}F(s)\\
频移L[e^{s_0t}f(t)]&=F(s-s_0)\\
尺度变换L[x(at)]&=\frac 1 {|a|}X(\frac s a)\\
象原函数微分L[f'(t)]&=sF(s)\\
象函数微分L[(-t)^nf(t)]&=F^{(n)}(s)\\
象原函数积分L[\int_0^tf(\tau)d\tau]&=\frac 1 s F(s)\\
初值f(0^+)&=\lim\limits_{s\to \infty}sF(s)\\
终值f(+\infty)&=\lim\limits_{s\to 0}sF(s)(运用前先判断终值f(+\infty)是否存在)\\
L[f(t)\ast g(t)]&=F(s)G(s)
\end{align}
$$

不过这里没有介绍收敛域的变化，需要特别指出其中收敛域和原来有不同的性质。

线性性质收敛域可能在交集的基础上扩大

频移性质会让收敛域移动

尺度变换会让收敛域放缩，保持X括号内的范围不变

象原函数积分本质上是用到卷积性质，和u(t)卷积，所以需要和Re(s)>0做交集才是最终的收敛域

时域微分可能会扩大收敛域

卷积性质的收敛域可能在交集的基础上扩大

其余的不改变收敛域

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022011421.png)

这道题在确定收敛域方面值得研究

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/20260702201144.png)

### 周期信号的拉普拉斯变换

对于单边周期信号，就是t>0部分是周期的，t<0没有值，有这样的结论

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022032316.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022047881.png)

先求出一个周期的拉普拉斯变换，然后套公式，把一个周期的收敛域和Re(s)>0做交集，像这里两个题目的一个周期内的拉普拉斯变换都是全s平面收敛的（第二个是因为这是时限信号），所以直接收敛域就是Re(s)>0

事实上用傅里叶变换做也可以，用s=jω换一下

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022048933.png)

### 解常微分方程

#### 常微分方程的三种形式

时域

$$
a_2\frac {d^2y(t)}{dt^2}+a_1\frac {dy(t)}{dt}+a_0y(t)=b_2\frac {d^2x(t)}{dt^2}+b_1\frac {dx(t)}{dt}+b_0x(t)
$$

经过拉普拉斯变换的频域

$$
H(s)=\frac {b_2s^2+b_1s+b_0}{a_2s^2+a_1s+a_0}
$$

注意写出H(s)的分子是x那边的系数而不是y那边的，你应该想象把右边的x除到左边的y，然后把左边的系数除到右边这样才对

H(s)可以叫系统函数，也有把它叫做传递函数的

然后第三种形式叫系统框图，先说明这样一个关系

$$
\begin{align}
\text{if}\ &x=a_2\omega''+a_1\omega'+a_0\omega, \\
&y=b_2\omega''+b_1\omega'+b_0\omega\\
\text{then}\ &a_2y''+a_1y'+a_0y=b_2x''+b_1x'+b_0x
\end{align}
$$

这个要证明就把x, y都换成ω然后全部展开就行，不过没必要，这是很显然的，你注意到a或者b的下标和求导的阶数是相同的，那就意味着，比如展开后的ω''''，它的系数就是所有下标和为4的a, b的组合，在这里只有a2b2能做到，同理，对于ω'''，那它的系数就是a1b2+a2b1，其余同理

这个关系是顺着说的，如果反过来就是你已经有了这个微分方程的关系，然后设了x是这个表达式，那么y就是那个表达式

如果带反馈，H要绕一点解出来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022049476.png)

我觉得应该用Y(s)=(X(s)-H2(s)Y(s))H1(s)这样更为直观

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022049568.png)

这个想背就背，不背的话自己推我觉得也能推出来

一种通用的求微分方程系统框图的方法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022049901.png)

这里用的是积分器来组合

系统框图写出来就是这样，把相关的变量的关系呈现出来

这种叫做直接Ⅱ型框图

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022050229.png)

加号是相加，中间那个是积分号，表达ω，ω'，ω''之间的关系，注意信号的流向，下面的ω'和ω都是中间往两边流，而ω''一直是从左往右。自己画的时候先画结构，再填系数，注意x, y分解成ω时ω的系数和x, y微分方程对应的不同，x, y的那个是a对应y，b对应x，但是x分解成ω，ω的系数是a的组合，而y是ω用b的组合

左边是y的系数，从上到下对应于y从高到低的顺序，注意最高的那个要1/x，而下面的要加负号，而右边是x的从高到低系数，直接抄

除此以外，系数为1可以不写，系数为0可以不画

一种经典的考法就是考这三种形式的互化，我觉得搞清楚a和b究竟哪个对哪个就行

中间的积分号有些时候也会写成1/s，因为根据拉普拉斯变换的时域积分性质相当于频域乘以1/s，这很好理解，用上卷积公式，就是和u(t)做一个卷积，对应频域就是乘以1/s，注意收敛域和Re(s)>0取交集

那解释一下为什么要这么麻烦搞这个系统框图，其实是因为这个框图就是电路图，电路好实现积分器和求和，所以用电路来实现微分方程就这样搞比较方便

有些时候H(s)分子分母有相同项可以约掉，这样框图可以被简化

还有叫做串联型和并联型的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022051199.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022051462.png)

这两种会读就行，不要求画。但是直接II型框图是要会画的，你直接背系数就行

#### 解方程

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022052721.png)

第一类就直接写H和X，然后分式因式分解，不过最后这里我没看懂啊，怎么不考虑收敛域了。可能是因为这里都是微分运算，不改变收敛域，所以X的收敛域和Y的一样，所以就都用第一个表达式就行，因为Re(s)>-1这种形式的收敛域只能往右，不能往左，所以用不到第二个式子

第一类给的x(t)是最简单的那种，第二类给的会奇怪一些，讲第二类之前先给一个定理

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022052749.png)

$$
e^{s_0t}\ast h(t)\overset{\mathcal{L}}\longrightarrow H(s_0)e^{s_0t}
$$

这里利用了拉普拉斯变换的定义，把$e^{s_0t}$分离出来之后剩下的可以看作拉普拉斯变换后带入了s0，这也是为什么要去s0在H(s)收敛域内才能这么搞

线性代数里特征值和特征向量的关系可以类比，Aξ=λξ，而在这里，A是LTI系统，ξ是e\^{st}，那么λ就是H(s)

突然发现其实这个也就相当于前面的cos(ω0t)经过系统得到|H(ω0)|cos(ω0t+∠H(ω0))，就是对这个频率成分乘了这一个增益

所以这种解法的本质就是，如果输入只是由若干分立的频率成分构成，就没有必要将其先经过拉普拉斯变换了，直接求相应的H(s0)然后相乘即可。不过注意这里的是只有对于整个时域都有定义的才能这么做，如果是带u(t)的那么它频率成分就不是单一的了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022053516.png)

利用这个结论就可以做像这样的题，分成一个定义域R的和一个带u(t)的，分别做就行。在这里一个常数经过LTI系统仍然是常数是容易看出来的，因为它是常数那求导的项就都没了，最后得到i(t)=e(t)

而2u(t)就用$e^{at}u(t)$公式就行

这题如果问你零输入相应和零状态响应，就要理解如果给了你整个时间的总输入要怎么理解。其实t<0的输入带来的就是零输入（零输入是针对t>0没有输入来说的），而t>0对应的就是零状态

注意对于t<0的u(-t)不要用u(-t)，可以换成1-u(t)，这样就没必要考虑变量代换了

##### 单边拉普拉斯变换

第三类是有初始条件的，前面的解方程都是默认初始条件为0，求零状态响应，这里就要用单边拉普拉斯变换了，这个就是复变里学的了，单边就是从0开始积分到正无穷，就这个不同，单边拉氏变换的结果可以写成$X_u(s)$来和双边的区分，这里u表示unilateral，是单边的意思

对于单边拉氏变换来说，微分就不只是添一个s了

$$
\frac {dx(t)}{dt}\overset{uL}{\longrightarrow}sX_u(s)-x(0^-)
$$

这里就带上了初值条件

由于解常微分方程通常就二阶的，所以还需要知道求二次导之后的变换

$$
\frac {d^2x(t)}{dt^2}\overset{uL}{\longrightarrow}s^2X_u(s)-sx(0^-)-x'(0^-)
$$

其实再用一次就得到了，更高阶的也类似可以得到

零输入响应$y_{zi}(t)$和零状态响应$y_{zs}(t)$，这里的zi是zero-input，zs是zero-state

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022054808.png)

像这样有初值条件的题，就需要拆成零输入响应和零状态响应分别做

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022054202.png)

注意零输入指的是t>0没有输入，但要考虑t<0的输入

举之前一道题的例子

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022055220.png)

回到刚刚那道题，直接对整体做单边拉普拉斯变换就可以把全响应给求出来，根据变换后每一项的来源可以分开零输入响应和零状态响应，就不用求两次了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022055126.png)

逆变换例题

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022056612.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022057221.png)

我补充一个Insight，单位阶跃响应的各种求解方式

法一：u(t)直接代入时域表达式直接求

法二：求出单位冲激响应后变限积分或“变限求和”，但这需要先对系统函数做逆变换

法三：直接把它当作一个输入，用频域的相乘再做逆变换

## z变换

### 定义

离散时间傅里叶变换

$$
X(e^{j\omega})=\sum\limits_{n=-\infty}^{+\infty}x[n]e^{-j\omega n}
$$

按照连续时间傅里叶变换到拉普拉斯变换的逻辑，应当是把jω改成s，但是这里是直接把$e^{j\omega}$换成了z，这也就是X括号里的东西体现的差异，这个东西不是乱加的，拉普拉斯变换和z变换才是最universal的那个。

$$
X(z)=\sum\limits_{n=-\infty}^{+\infty}x[n]z^{-n}
$$

z可以写为$re^{j\omega}$，这样也算实至名归对上了

X(z)可以看作x\[n]r\^(-n)做离散时间傅里叶变换

$$
X(z)=F[x[n]r^{-n}]=\sum\limits_{-\infty}^{+\infty}x[n]r^{-n}e^{-j\omega n}=\sum\limits_{n=-\infty}^{+\infty}x[n]z^{-n}
$$

这个是x\[n]做离散时间傅里叶变换逆变换

$$
x[n]=\frac 1 {2\pi}\int_{2\pi}X(e^{j\omega})e^{j\omega n}d\omega
$$

而z变换做逆变换其实还是就是把$e^{j\omega}$替换成z

$$
x[n]=\frac 1 {2\pi}\int_{2\pi}X(z)z^{n}d\omega
$$

由$z=re^{j\omega}$，两边取微分得到$dz=jre^{j\omega}d\omega=jzd\omega$，把这个带到逆变换就有

$$
x[n]=\frac 1 {2\pi j}\int_{2\pi(对\omega)}X(z)z^{n-1}dz=\frac 1 {2\pi j}\oint X(z)z^{n-1}dz
$$

注意这里积分限原来是针对ω在2pi内积分，换成z相当于在半径为r的圆上积一圈。z变换的基函数是z\^n，根据积分限得到就是用一个确定的r上的一周的z来表示x\[n]

### 重要的z变换

和拉普拉斯变换类似，在z变换这里也提出两个重要的

$$
\begin{align}
a^nu[n]&\overset{z}{\longrightarrow}\frac 1 {1-az^{-1}}=\frac z {z-a}, |z|>|a|\\
-a^nu[-n-1]&\overset{z}{\longrightarrow}\frac 1 {1-az^{-1}}=\frac z {z-a}, |z|<|a|
\end{align}
$$

虽然最开始写的是把z写成z-1的样子，但是我在后续做题的时候感觉还是都乘一个z比较容易看分解，或者你用H(z)/z分解之后再把z乘回去也行，怎么舒服怎么来

注意u\[-n-1]在0处为0，在负整数部分都是1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022058995.png)

这题就是拉普拉斯变换那道题的翻版了，有意思的是此时不是靠正负号来区分，而是一个是b一个是1/b

对于cos(ω0n)u\[n]和sin的也是像拉普拉斯变换那样用重要公式搞出来，而不是用时移性质，这两个不用记忆，自己推就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022059838.png)

### 常用z变换

$$
\begin{align}
\delta[n]&\overset{z}\longrightarrow 1, 全平面收敛\\
u[n]&\overset z \longrightarrow \frac 1 {1-\frac 1 z}, |z|>1\\
a^nu[n]&\overset z \longrightarrow\frac 1 {1-a\frac 1 z}, |z|>|a|\\
更常用的a^{n-1}u[n-1]&\overset z \longrightarrow \frac 1 {z-a}, |z|>|a|\\
\cos(\omega_0n)u[n]=\frac 1 2 (e^{j\omega_0n}+e^{-j\omega_0n})u[n]&\overset z \longrightarrow \frac 1 2(\frac 1 {1-e^{j\omega_0}z^{-1}}+\frac 1 2(\frac 1 {1-e^{-j\omega_0}z^{-1}}), |z|>1\\
-a^nu[-n-1]&\overset z \longrightarrow\frac 1 {1-a\frac 1 z}, |z|<|a|
\end{align}
$$

$\frac{z}{z^2+1}$对应$\sin(\frac \pi 2 n)u[n]$，$\frac{z^2}{z^2+1}$对应$\cos(\frac \pi 2 n)$

务必注意，无论是s还是z变换，u的变换都不带δ，是很干净的。

### 收敛域性质

有限长序列收敛域全平面

右边序列收敛域在某圆外，左边序列收敛域在某圆内，双边序列收敛域是圆环

因果序列也是右边序列，收敛域在某圆外，且极点数量大于零点数量

稳定序列收敛域包含单位圆

其实从s到z是经过$z=e^{sT}$，一个保角映射，不过这里不展开

### 性质

线性性收敛域也是至少R1∩R2

时移

$$
x[n-n_0]\overset z \longrightarrow X(z)z^{-n_0}
$$

收敛域不变

我觉得时移性质太好用了，做任何分式类的题目都应该多用时移性质，比如说一个分子是多项式分母也是多项式的X(z)，把分子一项一项拆开，就只剩下1/(分母)。只要把这个的x\[n]求出来，那么z/(分母)对应的x_1\[n]就只是x\[n+1]，对于更高次也可以这样做。

z域微分

$$
nx[n]\overset z \longrightarrow -z\frac {dX(z)}{dz}
$$

收敛域不变

对比离散时间傅里叶变换的频域微分性质

$$
nx[n]\overset {\mathcal{F}}{\longrightarrow}j\frac {dX({e^{j\omega})}}{d\omega}
$$

从z域微分开始，把z换成$e^{j\omega}$，然后把dz展开之后就行了，证明这个就抓住离散时间傅里叶变换是z变换的特殊情况就行

只需要记忆$(n+1)a^n u[n]\overset{z}{\longrightarrow}\frac 1 {(1-az^{-1})^2}$

序列指数加权（调制）

$$
z_0^nx[n]\overset z \longrightarrow X(\frac z {z_0})
$$

收敛域变为|z0|R

这个本质上是对应DTFT的频移性质，在频移性质里e\^{j(ω-ω0)}其实就是除以z0。但是频移性质不能套到这里，因为它不是直接的减

时域翻转

$$x[-n]\overset z \longrightarrow X(\frac 1 z)$$

收敛域1/R

时域扩展

$$
x_{(k)}[n]\overset z \longrightarrow X(z^k), R^{\frac 1 k}
$$

这个是离散情况特有的一个性质，$x_{(k)}[n]$表示以0为中心，每个之间塞k-1个0，DTFT里也有

卷积

$$
x[n]\ast h[n]\overset z \longrightarrow X(z)H(z)
$$

收敛域至少R1∩R2

注意z变换没有X(z-z0)的这种频移性质，离散时间傅里叶变换里的频移性质是

$$
e^{j\omega_0n}x[n]\overset{\mathcal{F}}\longrightarrow X(e^{j(\omega-\omega_0)})
$$

这个没法把$e^{j\omega_0}$变成z0来得到

给一道很有挑战的题目

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022100417.png)

我原来想的分解方法是分子提一个z然后就直接配凑，但是这里没有，所以需要补，这里我想的是两侧乘以z，那这样zX(z)就可以进行分解了，不过我还是遇到了困难

$$
z\frac {2z+4}{(z-1)(z-2)^2}=z\frac {8(z-1)-6(z-2)}{(z-1)(z-2)^2}=z(\frac 8 {(z-2)^2}-\frac 6 {(z-1)(z-2)})
$$

6那一项还可以继续拆成(z-1)-(z-2)，之后乘以z就容易求了，但是左边让我有些犯难，因为确实之前不熟悉z/(z-z0)\^2反变换是什么。我觉得有必要搞清楚1/(z-z0)，1/(z-z0)\^2，z/(z-z0)\^2的反变换是什么才行，至于左边多乘的那个z，可以通过时移性质还回去，我暂且是这么想的

初值定理和终值定理，注意只针对因果信号

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022101876.png)

注意这里和拉普拉斯变换那里形式不太一样。

### 解差分方程

#### 差分方程的三种形式

第一种是用x和y的时域表达，注意这里和微分方程的含义很不一样，因为离散的本质上是经过采样的，两个采样的相减表达的含义就没那么直接了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022102590.png)

注意时移性质是多了一个$z^{-n_0}$

其实就会发现z的幂和n接的东西是一样的，比如括号里是n-1那就是-1，非常直接

第三种系统框图形式，也要先引入定理

$$
\begin{align}
\text{if}\ &x[n]=a_2\omega[n-2]+a_1\omega[n-1]+a_0\omega[n], \\
&y[n]=b_2\omega[n-2]+b_1\omega[n-1]+b_0\omega[n]\\
\text{then}\ &a_2y[n-2]+a_1y[n-1]+a_0y[n]=b_2x[n-2]+b_1x[n-1]+b_0x[n]
\end{align}
$$

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022102229.png)

系统框图中间那一条变成了延时器，D是delay

务必注意和拉普拉斯变换里框图的系数不一样。这里从上到下是1/a0，-a1，-a2，但是拉普拉斯变换那个，如果是积分器而不是微分器的话，从上到下是1/a2，-a1，-a0。哦不过其实如果你把y\[n]写在最前面，把y\[n-n0]写在最后，那其实形式也一样。你看经过延时器D，那后面系数都是一一匹配的。

如果给的是n+2的，替换n也可以变成都是n-的样子

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022103976.png)

比如一开始虽然有n+2，但是替换n为n-2，方程仍然成立，转换成了我们喜欢的

D可以换成$z^{-1}$，因为延时变成n-1相当于z那里乘以$z^{-1}$

#### 解方程

第一类输入

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022104504.png)

没说你就默认按因果的那个展开

第二类输入就是可以拆成常数+若干u\[n]的，也是先介绍一个定理

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022105238.png)

$$
a^n\ast h[n]\overset{z}\longrightarrow H(a)a^n
$$

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022104020.png)


然后也是和拉普拉斯变换那里类似有一个定理，注意稳定就是包含单位圆

务必小心，此时收敛域是一个环，一部分要用u\[n]的展开，另一部分要用-u\[-n-1]展开

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022105698.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022106996.png)

于是就分开算就行了，没什么技术含量。如果改成求零输入响应和零状态响应，就要拆成两个输入

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022106859.png)

再来一个分解的例子

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022107832.png)

把输入视为两个a\^n的频率成分，分别求出H(a)即可

##### 单边z变换

第三类，带初始条件的，就需要用单边的了

$$
x[n]\overset{uz}\longrightarrow X_u(z)=\sum\limits_{n=0}^{+\infty}x[n]z^{-n}
$$

单边z变换的时移性质

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022108748.png)

观察特征。不难发现，第一项总是和x\[n-n0]的-n0有一一对应的关系，而对于减的那些，后面的都是加，而且括号里的和z的幂之和都是相同的，比如x\[n-1]，第一项有了z\^(-1)，那括号里就只有z，而x\[-1]由于z的幂是0，所以内部是-1，后面的类似。而加的呢，符合相同的特征，只是后面的都是负的

如果要更加严谨地解释，看这个图就知道了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022108475.png)

补的就是从0开始多出来的，然后其实还是套z变换定义公式

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022108948.png)


x\[n-1]u\[n]的双边和单边一样，此时u\[n]截断了大于零的部分，而这和x\[n-1]u\[n-1]的双边是不一样的。

x\[n-1]u\[n-1]和x\[n]u\[n]就差一个z倍，但是x\[n-1]u\[n]相比x\[n]u\[n]带了初值

说实话如果要推我建议直接画图，你画图之后看的更明白，对于每一项是什么情况，直接用级数的公式写出来你就知道差了哪些了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022109461.png)

后面就是分解的事情

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022109358.png)

困难的题目

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022109841.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022110165.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607022110673.png)

本页总阅读量<span id="busuanzi_page_pv"></span>次