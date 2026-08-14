# 数字电路下半

## 触发器

### 基本RS触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031831492.png)

引入了反馈，目的是让它能够“储存”输入，这块我稍微讲的详细一些。

看-RD和-SD的输入怎么影响输出。如果-RD=-SD=1，那么Q和-Q不会改变，你假设原来Q=0，那么经过G1，-Q=1，然后经过G2，Q=0，和原来一样。假设原来Q=1，经过G1，-Q=0，经过G2，Q=1，和原来一样。

如果-RD=1，-SD=0，这个时候你就先看0对应的那个，因为对于与非门来说，只要有一个是0那它输出就是固定的，这里-SD=0的话，那Q就一定是1，然后就推出-Q=0。如果-RD=0，-SD=1，那么-Q就一定是1，推出Q=0。这里的R是reset，复位，S是set，置位。-SD=0对应SD=1，也就是置Q为1，而-RD=0对应RD=1，也就是复位Q为0。

如果-RD=-SD=0，那么Q和-Q都是1，这其实是违背设计初衷的，因为本来就是希望正常工作的时候Q和-Q是相反的，因此这种情况要避免。如果在-RD=-SD=1的情况下突然让它们两个都跳变为0，由于不确定跳变的先后，所以之后的输出是无法确定的，这也是要避免的情况。不过如果你可以明确让其中一个变成1，另一个仍然保持是0，那么仍然是稳定的。

那么“储存输入”从何而来呢，比如一开始你是-RD=0，-SD=1，也就是Q=0的状态，此时你突然改成-SD=-RD=1，那么Q还是0，-Q还是1，不会因为你的输入改变而改变，这就是“储存”的含义。

除了与非门，还有或非门构成的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031832073.png)

当SD=RD=0，原来是怎么样的还是怎么样，起到“储存”的作用。当SD=1，RD=0，由于这是或门，有一个是1那输出就确定，于是看SD=1，直接推出-Q=0，进而推出Q=1。其实只要不是两个都被限制的情况，一定是满足Q和-Q相反的，分析起来可以推出一个直接得到另一个。那么如果SD=0，RD=1，就是Q=0，-Q=1了

如果SD=RD=1，那就也是出现Q和-Q都是0的状态，同时跳变到0的话就无法确定，这是要避免的情况。

或非门构成的电路就可以实现如果SD和RD一下断电了，原来的输出还可以保留

分析Q和-Q的波形的话，其实就根据各种情况一一对应就行，注意如果两个一起从1跳到0，那就无法确定，不过如果有明确的时间间隔，那还是可以确定的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031832424.png)

不确定的（两个从1跳回0）在方框里写一个大叉就行，不用像这样画成格子

下面是用触发器避免开关弹跳的影响的例子

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031833104.png)

S接哪里哪里就是0，没接的就是1。当S打到下面去，就算和下面有接触不良（也就是这里说的机械弹跳），由于这是与非门构成的，就算S和-RD断开，导致-RD也是1，也不改变原来的输出

### 同步RS触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031833424.png)

在基本RS触发器的基础上多连了一部分东西，注意原来的-RD和-SD输入端还是保留的。为什么叫同步触发器呢，因为只有CP=1的时候才能通过R和S控制输出。在CP=0的时候，不管怎么改变R和S，Q和-Q都不会变化，因此Q和-Q和CP的状态是同步的，这就是同步的意思。这里-RD和-SD称为异步输入端，异步就是和CP不同步，你什么时候搞都行，平时不用它的时候就接高电平。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031833184.png)

Qn是初态，Qn+1是次态

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031834899.png)

加个约束条件是因为R=S=1的两种情况是不给用的

在时钟高电平到来前需要把正确的R，S给输入进去而且在高电平来之后要保持至少3tpd来保证两个输出（Q, -Q）能够完全调好

#### D触发器

为了严格限制不出现R=S=1的情况，设计了这样的电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031834057.png)

其实也就是保证R和S一个是1一个是0，因为就是D和-D，这样的叫做D触发器

把S=D，R=-D带入Qn+1的那个函数，化简得到Qn+1=D

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031834539.png)

### 边沿触发器

#### 边沿触发的RS触发器

虽然同步RS触发器已经可以做到控制什么时候RS可以调整，但是希望尽量减少这个允许调整的窗口期，从而避免干扰。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031835656.png)

在CP那里加了一个东西，脉冲边沿检测展开是这样的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031835317.png)

这样就可以做到只有跳变的时候那一小段区间是允许RS控制的

#### 边沿触发的D触发器

这个才是用的更多的D触发器，前面那个电平触发的用的少。分两种，一种是主从型，一种是维持阻塞型，但不管是哪一种，外部特性都一样，也就注意一下是上升沿还是下降沿触发

主从型

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031835301.png)

当CP从0变成1，主触发器工作，从触发器状态不变，使得QM=D。接下来让CP从1变成0，主触发器状态不变，从触发器工作，使得Q=QM，这样完成传输。输出端真正发生变化是发生在下降沿，所以认为主从型D触发器是下降沿触发的

还有个用CMOS做的，电路比较复杂，我就不分析了，直接知道怎么输出就行，原理一样，主触发器接收信号，然后主触发器保持不变，然后从触发器获得信号

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031836383.png)

就CP处于从0到1的上升沿的时候，D=Qn+1，当CP处于其他状态，Q状态不变，如果C1那个三角形外面有个圆圈，那就是下降沿触发器，三角形说明是边沿触发

维持阻塞型

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031836509.png)

这个分析过程同样比较绕，就记住先是CP=0，然后D调到你想要的状态，然后当CP从0到1的上升沿，完成Q=D，当CP=1稳定的时候D也不会改变Q。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031837497.png)

4.1.12就是维持阻塞型D触发器，只有上升沿可以输入。4.1.7是高电平触发的D触发器，在CP=1的时候都可以输入

-RD和-SD可以强制改变Q输出，当它们都是1的时候不影响输出。然后呢对于4.1.12，就看所有上升沿的时候，就把D的信号复制到Q，对于4.1.7，就是看CP=1的时候把D的信号复制到Q

#### JK触发器

负边沿触发的JK触发器，JK无特殊含义，只是为了和RS区分

JK触发器其实可以实现RS触发器和T触发器的功能，用的比较多，需要熟练掌握，其实真值表也不难。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031837785.png)

这个东西只有在负边沿(CP从1到0)才可以使得$Q^{n+1}=J\cdot \overline{Q^n}+\overline K \cdot Q^n$，其余时候都保持Q不变

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031837882.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031837941.png)

这种波形分析列表就完事了，第一步先把各个CP触发沿处采样的JK给记录下来，然后再根据JK的组合来判断Q的变化。不要对着图上波形来画波形，容易搞错，其实都是离散的点，一个一个判断就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031837155.png)

#### T和T'触发器

T'触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031838337.png)

下降沿触发的T'触发器，一遇到下降沿就把Q取反，如果是上升沿触发的话就是遇到上升沿就取反

T触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031838999.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031838344.png)

可以把基本的触发器改装成T'或者T触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031838207.png)

### 动态特性

同步的传输延时

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031838201.png)

异步的传输延时

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031839380.png)

建立时间是输入逻辑电平在输入端保持恒定所需的最短时间，输入逻辑电平需要先于时钟脉冲触发边沿到达

维持时间是时钟触发边沿到达后输入逻辑电平还需维持恒定的最短时间。建立时间和维持时间就是触发沿到达的前后的各一段和输入有关的时间。先建立再维持，这样你就能分清楚前后了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031839922.png)

最大时钟脉冲fmax是触发器能够可靠触发的最高频率，高于这个频率它就跟不上了

下面看一个具体的例子

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031839765.png)

一开始两个输入都是1，不改变状态，然后-RD变成0之后，G1要花tpd反应过来发生变化，然后-Q变了之后传到G2，G2也要花tpd反应过来把Q改了，所以tpdHL(Q: 1→0)=2tpd，看的是Q的那个反应时间。然后后面如果是-SD变成0，G2反应过来花了tpd才把Q改成1，然后-Q就是2tpd了。此时tpdLH(Q: 0→1)=1tpd，看的是Q的

由此可知，为了完成数据存储(置0或置1)，需要2tpd时间（也就是上面两种情况取最大），所以-RD和-SD数据存在的有效时间（最小脉宽）是2tpd

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031839983.png)

### 状态转换图和激励表

以JK触发器为例

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031840820.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031840201.png)

注意后面时序逻辑电路设计里面那个状态机的也叫状态转换图。

怎么根据特性表写状态转换图呢，其实状态转换图里只有那四种转换的条件是要写的，那你就看你要找的状态对应的输入有哪些可能，比如我们看0到0的，那就回特性表里找，0到0的只有J=0, K=0和J=0, K=1，那你就写出来是J=0，K=×。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031840597.png)

激励表和状态转换图没什么区别，只不过状态变化不是用画图而是直接写出来。后面设计时序逻辑电路，写每个状态的JK的时候需要经常用激励表，建议先想好写下来，就不用后续一个个想了。

### 数码寄存器

寄存器是把触发器改来存储多位二进制数的

先看数码寄存器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031840766.png)

CR称为清零控制端（高电平清零），LE称为锁存控制端（上升沿允许写入）

先CR=1，也就是R=1，使得Q3Q2Q1Q0=0000，也就是复位，然后CR=0。然后D3D2D1D0是想要输入的二进制数，到位了之后让LE=1，也就是C1=1，就可以把D3D2D1D0分别存储到Q3Q2Q1Q0，之后让LE=0，Q3Q2Q1Q0就不再改了

74HC175

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031840012.png)

-MR是清零控制端，端口接低电平可以清零，CP是锁存控制端，上升沿储存

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031841873.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031841113.png)

主持人先让-MR=0，清零。一开始Q1Q2Q3Q4都是0（也就是-Q1...都是1），经过G1输出1。当CP是上升沿，G2输出下降沿到CP，当CP是下降沿，G2输出上升沿到CP，因此CP是下降沿且Q1Q2Q3Q4=0时允许写入数据。当S1抢答也就是闭合开关，当CP下降沿到来时，使得Q1=1，-Q1=0，于是G1输出0，G2输出1到CP。由于CP检测的是上升沿，现在G2输出固定了，于是Q1Q2Q3Q4不再改变，一直都是这样，即使之后有其他人闭合开关，也无法改变结果。

### 移位寄存器

shift register

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031841986.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031841487.png)

C1有非，所以是CP的下降沿对应可以写入数据的位置。写入的时候是从高到低写，有几个位就要经过几个下降沿才能全部写进去

74HC194

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031842652.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031842890.png)

DSL用于控制左移之后再右边空出来那一位填什么，DSR用于控制右移之后在左边空出来那一位填什么，L是left，R是right

S1=S0=0的时候，就是一个数码寄存器，要配合并行置数来用

74HC595

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031842917.png)

-SRCLR(shift register clear)是清零的，输入低电平清零。SRCLK(shift register clock)是上升沿触发的移位时钟，SER(serial data input)是串行输入数据端，Q7'是串行输出数据端，Q0到Q7是并行输出，可以锁存，用RCLK(registor clock)就可以锁存。-E是输出使能端，输入低电平才可以输出。这个东西你在存数据的时候先清零然后设置好SER然后来一个SRCLK，这样就输进去了一位，然后再设置下一位的SER再来一个SRCLK，就这样直到都输入完了就可以用RCLK锁住了，在此之前RCLK都是disable的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031842982.png)

用寄存器可以做一些功能

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031843825.png)

DSL就是之前讲到的那个可以设置左移之后右边多出来的那一位是0还是1的那个输入端，那用它其实就可以用来串行传信号了，每经过CP的一个T就移动一位，要移动到输出Q0需要经过n-1个CP的周期，也就是延迟了这么久

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031843935.png)

首先让S1=S0=1，把你想要循环的序列通过D输入到Q。然后让S1=0，S0=1，也就是右移模式。而且把Qn-1接DSR，这样它送进去的就和Qn-1一样。这个时候每取出一个Qn-1，它就会再输入到序列的末尾，从而实现了循环。

#### 二进制乘法器和除法器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031843125.png)

它这里说和集成移位寄存器的规定有所不同具体是这样的，我们看看功能表是怎么说的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031843508.png)

在这里左移是把Q1Q2Q3的移动到Q0Q1Q2，然后在Q3的位置上添一个东西。但是这相当于位运算的右移，因为位运算是从高往低排的，比如1011右移1位是101，左移1位是10110。

B是按照B0, B1, B2, B3的顺序一位一位输出的，一次输出只输出0或者1，而×2的功能是通过CP使得7位左移移位寄存器执行表中“右移”的功能，实现的是位运算的左移，因此它把DSL给接地了，用不到执行表中“左移”的功能。而4位右移寄存器，用的是功能表中“左移”的功能，从而实现输出了B0之后，下一个输出B1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031844482.png)

第一次，4位的那个给了B0，B0和A的各位分别与（相乘），得到8位加法器的A3A2A1A0输出到Q再回到B

第二次，4位的那个给了B1，A执行了“右移”，实际上是位运算的左移，末尾补了0，然后A4A3A2A1A0和B1分别与（其实所有位都执行了与，只不过七位寄存器最开始的0我就没说了），给到8位加法器，然后再和B那里放的第一次的结果求和。

后面的就一样了

二进制除法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031844465.png)

### 二进制计数器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031844054.png)

这种是同步的时序逻辑电路，CP接同一个，所以特性方程就需要额外设计。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031845150.png)

一开始都是0，保持不变，第一个下降沿到来的时候，让Q0反转了，但是在反转前Q0仍是0，因此对Q1没有影响。第二次下降沿时，Q0=1，于是让Q1反转，然后Q0自己也反转，于是就变成了10，第三次因为Q0=0，所以Q1不变，Q0反转，得到11。第四次Q1和Q0都是1，于是Q1旁边的那个&就通了，使得Q2变成1，而Q1和Q0自己反转为0

图中Q2的周期是CP周期的八倍，Q1是四倍，由此可以看出这种计数器可以作为分频器，也就是在原来频率的基础上得到不同的频率

把这个加法计数器的所有和与门连接的都从Q改成-Q就变成了减法计数器，没有细讲

还可以改成这样接

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031845103.png)

这个电路因为JK都是接1，所以C1接收一个下降沿Q状态就变化，而这里把后一个的Q作为了前一个的CP，所以也能起到计数的效果，这种是异步的，其实异步设计起来简单一点

如果把C1都接-Q，就也会变成减法计数器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031845760.png)

如果保持原电路但是改成上升沿触发，也会变成减法计数器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031845289.png)

### 环形计数器

和二进制计数器不同的就是希望实现1000→0100→0010→0001这样的循环，每次只有一个是1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031846071.png)

也可以用译码器来做，就不用那么多触发器了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031846998.png)

Johnson计数器（又称扭环形计数器）期望输出序列是这样的：

0000 1000 1100 1110 1111 0111 0011 0001 | （循环）0000

有n位的话就是以2n为周期

实现原理是把环形计数器的-Q3接到输出Q0的那个触发器的D那里去

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031846647.png)

注意要生成期望的序列初始应该设定为0000，而不是像环形计数器那样是1000，如果初始值错误那不会产生这样的序列

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031846464.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031847367.png)

要用的时候在这六个循环里选一个想要的循环，然后把它初值调成这个循环中的一个，然后按照4.2.24那样接，就可以实现每个CP上升沿的时候就变成下一个。如果因为扰动导致和你选的循环里的每一个都不一样，那就没法回到原来的循环状态

### 触发器题目

触发器经常就是考时序了，波形图让你画。或者让你写驱动方程（Qn到触发器输入），特性方程（触发器输出Qn+1和触发器输入的关系），状态方程（Qn+1和Qn的关系，就是把驱动方程代入特性方程得到）。

真值表，表达式（特征方程），状态转换图，激励表的互换

让你实现某个状态方程，主要就看你对特性方程熟不熟，尤其要记住JK触发器的$Q^{n+1}=J\overline {Q^n}+\overline{K}Q^n$

一道重要的题目

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031847628.png)

Q是进位（反过来），左边第一位（R1）寄存单元是求和的结果（反过来），Si和R1之间只是隔了一个CP脉冲。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031847806.png)

分析这个需要画表，其实感觉这种时序分析，画表比直接画波形图来的清晰，不容易漏掉。注意COi下一个时钟变成Ci-1，而Si下一个时钟变成Si'，Si'是送进去右边那个移位寄存器的。

你从感性认识可以很容易知道和数移位寄存器存的就是11011+10111=110010，倒序。只是精细的时序分析还得像上面这样。

## 时序逻辑电路

时序逻辑电路在组合逻辑电路的基础上引入了反馈

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031847284.png)

$$
\begin{align}
触发器驱动方程D_i(或J, K)&=F_1(X, Q^n)\\
触发器次态方程Q^{n+1}&=F_2(D, Q^n)\\
电路输出方程Z&=F_3(X, Q^n)\\
\end{align}
$$

描述时序逻辑电路可以用真值表（最直接），状态转换图（最直观），时序图（以CP为顺序展示工作状态）

时序逻辑电路按触发器是否接同一个时钟分为同步/异步，按输出是否和外部输入有关分为Moore/Mealy

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031847893.png)

这两个电路虽然都有a, b, C作为输入，但是左边的这个经过Σ那个输出之后是接到了D而不是直接输出，只有当CP来了把这个值传递到Q1之后才能输出到Si。这样就使得如果已经产生了一个Si，下一个CP还没来，a, b发生改变时D的输入会改变，但是Si的值仍然不变。而右边这个是a, b变了之后Si直接就变了，不受CP影响。所以区分Moore和Mealy就看输入改变是否异步地影响输出，如果能异步影响就是Mealy型

所以看波形的话，Moore型就是只有CP触发沿到了输出才有可能变化，如果CP没到就有变化那就是Mealy

### 同步时序逻辑电路

正序分析其实是很简单的，结构都给你了，把表达式写出来然后看看实现了什么功能

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031848363.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031848895.png)

这一步是直接根据图写逻辑表达式，这一步不难的，你就对着图一个个写就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031849715.png)

X, Q2, Q1, Q0就是十六种组合写出来，然后对于每一种组合，需要根据驱动方程求出此时的JK，根据JK触发器的功能判断这会导致Q发生怎么样的变化，表中省略了J, K的求值，直接给了Q是怎么变的，自己做的时候建议把JK两列给写出来，方便排查。而且后续倒过来设计的时候也是需要把JK写上的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031849041.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031849783.png)

比如这就是000到111循环的过程

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031849790.png)

这是那个六个循环的寻找过程

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031850590.png)

什么情况是可以自启动的呢，就是非主循环的状态只有指向主循环的路可以走，那就可以纠正回去

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031850808.png)

### 异步时序逻辑电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031850430.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031851509.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031851969.png)

说真的挺麻烦的，就是要看的东西更多了，不是统一的一个CP来控制了。但是真值表该怎么列还是怎么列，还是从000开始，异步的那个你就要检查什么情况下才会响应

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031851661.png)

一定要注意是看跳变前的值（Qn）来确定下一个的状态（Qn+1），不要用Qn+1来看

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031851656.png)

### 设计计数器型同步时序电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031852108.png)

画状态转换图（和简化），分配每个状态对应的编码，画真值表，画卡诺图，求Q和Z的方程，由Q和Z的方程推D或JK的方程，检查自启动，画电路图

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031852779.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031852093.png)

先把状态转换图画出来，从状态转换图得到真值表是简单的，然后得到真值表要进一步得到卡诺图，就把每一个Qn+1和Z都单独作为一个输出来推导和输入的关系

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031852111.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031852747.png)

其实如果落到JK再去化简的话，虽然步骤多一些，但是胜在你一定能搞出来，我也是建议把JK给写出来直接对JK化简，就没必要和JK特性方程比较然后一个一个猜了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031853698.png)

一开始你应该画出这样的一张表和下面的卡诺图。JK的结果用JK触发器的激励表遍历所有情况，比对Qn和Qn+1得出。而这个卡诺图的特殊之处在于它把无关项提前X掉了，接下来就是把JK当中的每一列，依次用铅笔填进去然后圈1化简，铅笔填完擦掉可以搞下一个，就没必要全部用黑笔画，那样每次画完又要重新画一个，否则很乱。

我这里给出J3，K3，J2，K2的卡诺图，剩下的J1，K1，J0，K0同理

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031853840.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031853714.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/20260703185405.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031854120.png)

这个输于Moore型的，因为输出改变必须靠时钟。

再比如用JK触发器设计一个六进制减法计数器，其实直接写出状态转换图，然后翻译成Q\^n和Q\^n+1的真值表，这一步是非常简单的。然后下一步就是要根据每一个Q的转换，倒推出初态时的JK应该是什么

遵循这个规则：

| $Q^n$ | $Q^{n+1}$ | J   | K   |
| ----- | --------- | --- | --- |
| 0     | 0         | 0   | X   |
| 0     | 1         | 1   | X   |
| 1     | 0         | X   | 1   |
| 1     | 1         | X   | 0   |

可以记忆它的特殊之处，就是00，01和10，11的JK有对称的关系，这样你只要把00和01写出来了就反一下就行。

理解起来都不难，主要根据JK的四种组合，00是保持，01是置零，10是置一，11是翻转来确定可以哪些JK组合就行。然后真正花时间的是遍历每一个都得出JK的取值。然后得到JK的取值之后，依次进行卡诺图化简

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031854270.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031854962.png)

因为JK都是用初态的Q经过组合逻辑电路得到的，所以是以Q的取值来分情况。

如果要你设计自启动的，没有必要一上来就设计无关状态的路径，而是先把无关状态都当成X，然后做出来设计之后，再反过来检查那些无关状态会通往哪里。很多时候已经满足自启动了，如果不幸发现无关状态有一些会进入死循环，那就再对其中的一个状态让它能回到主循环，重新设计JK（注意之前的JK表达式可以保留，也就卡诺图那一步需要改一改，所以工作量没有一开始的大），然后设计出来再做检查，基本上到这一步已经够了。

其实还有一种暴力方法就是对于无关项直接用复位来搞

### 设计状态机型同步时序电路

其实从广义来说，计数器型也属于状态机型，只是计数器型的逻辑很简单，就是+1，-1，而状态机的状态之间可能就存在跳跃，不是计数器那种简单的线性。

状态机的设计思路会明显比计数器的复杂，一个点就是需要你自己构思状态，这确实比较复杂。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031855461.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031855025.png)

要看明白是怎么从图到表的，Q1Q0就是状态的，根据X是1还是0来判断n+1的时候是什么样的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031855922.png)

虽然状态机型设计起来最难，但是篇幅很小，应该不会作为重点考察，熟练掌握计数器型的就行，布置的作业题里也只做过计数器型的。

### 单片中规模集成计数器

74HC163 74HC161

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031855498.png)

-CR=0用来清零，区别在于163是上升沿清零（同步清零），161是只要你-CR=0就能清零（异步清零），这是这两个型号(163和161)计数器唯一的区别。注意161也是有时钟的，只是清零那里不一样，但是时钟啥的都是一样的。务必注意LD置数二者性质是一样的，并不存在一个比另一个少一个的这种情况，务必分清楚

-CR=1, -LD=0用来置数

-CR=-LD=1，两个计数控制端为1就实现四位二进制加法计数，如果有其中一个为零就保持

进位输出CO=Q3Q2Q1Q0，也就是只有四个都是1的时候它才会变成1

74LS192

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031856419.png)

注意这个是实现十进制加减法，和前面HC实现的4位二进制不一样

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031856099.png)

$CP_U$是加法计数脉冲，U是UP，而$CP_D$是减法计数脉冲，D是DOWN。

由于它是十进制的，所以进位输出CO=$Q_3Q_0\overline{CP_U}$，也就是1001，8+1=9了之后你还要加（此时CP_U是0，准备到达上升沿），那就告诉你要进位。而借位输出BO=$\overline{Q_3}\ \overline{Q_2}\ \overline{Q_1}\ \overline{Q_0}\ \overline{CP_U}$，就是0000了你还要就告诉你要借位

### 用集成计数器做N进制计数

当N小于集成计数器的N的时候，可以只用一片来做，多的话就要用多片，这里先介绍一片的情况。

反馈清零法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031856012.png)

实现的时候，如果用==反馈清零==计数N，那么163是N-1的二进制的情况连接到清零端，161是N的二进制的情况连接到清零端。原因是0到N-1是N个状态。但是注意如果是==反馈置数==且置0，那么163和161都是用N-1的。

如果用5.4.4的电路，效果大概是这样

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031856953.png)

但是清零也需要时间，不是同时清零的，就有可能出现Q2Q1Q0有一个已经清零了但其他的还没有清零，这个时候-CR又会立刻跳回0，那清零就不彻底，不能实现回到0000的效果，因此需要延长-CR=0的时间

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031857296.png)

就加了一个RS触发器，当Z=0也就是希望清零的时候，把Q也变成0，开始清零，清零过程中Z一下变为1，此时RS触发器的两个输入都是1，处于保持状态，Q还是0，直到CP变成0，Q才被置1，这样就能保证清零了。不过好像这个电路在题目里也挺少见的，除非题目特别问这个，否则你就直接按之前那样接就行。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031857810.png)

注意同步清零(163)的话，选最后一个状态作为-CR变为0的条件即可，但是异步清零(161)需要让下一个状态作为-CR变0的条件

反馈置数法

其实就是如果计数器开头第一个不是0000的话就用反馈置数法就行（如果是0000也能用，无所谓，多一个选择）。注意163和161的反馈置数法都是用最后一个出现的状态（如果是0开始那就是N-1），因为都是同步的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031857166.png)

这图画错了，不应该接Q2应该接Q3

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031857676.png)

192的置数是异步的，所以需要用下一个状态，而它的下一个状态不是1111而是1001，因为它只有十个。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031858858.png)

使用反馈清零法和反馈置数法的前提是，题目要求的变化是按集成计数器本身设计的那个序列走的，如果出现了不同那就要另外设计，可能需要把多个小片段拼贴起来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031858291.png)

①到达1000下一个置数0011循环

②到达0110下一个置数1001

③到达1001下一个置数0111

但是置数端只有一个，怎么实现呢？那你就根据Q来改变置数的数值，不要像之前那样一直保持相同的置数

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031858775.png)

务必注意LD也要跟着变

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031859617.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031859497.png)

### 大容量集成计数器

当需要实现的计数器的模比中规模计数器的模大的时候，需要把多个中规模的连在一起，这样就叫大容量了，有两种级联方法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031859251.png)

多片级联计数器能实现的最大的模是所有计数器的最大的模的乘积

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031859341.png)

-Q3-Q0就可以实现除了1001之外都是1，就只有1001的时候是0，这样从1001变到0000就会得到一个上升沿。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031900304.png)

其实就很简单，三个功能对应三个与非门

①个位到1001下一脉冲归零（用了LD，也可以用CR）

②个位到1001下一脉冲十位加1（用个位的数值做脉冲实现）

③十位到0101下一个十位进位归零（用CR）

个位用的是置数法，就是接到LD然后把D3D2D1D0传到Q那里去，其实我觉得放CR也可以。十位当到达0101的时候就会让它清零，直接用了CR

接下来看同步级联法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031900113.png)

注意下一个时钟到来时依据的是之前的状态，到达1001的时候虽然CT都是1，但是在这之前是0，所以十位仍然没有开始计数，直到下一个才开始计数，这部分说的是个位向十位进位的控制

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031900714.png)

①个位到达1001下一个脉冲清零

②个位到达1001下一个脉冲十位+1

③十位到达0101==且个位到达1001==，下一个脉冲十位清零（注意这里和异步级联法的逻辑不同，异步级联法只要十位到达0101且下一个脉冲到来时清零即可，因为它的脉冲由个位的1001产生，但这里脉冲一直有）

这部分说的是十位的清零。解释的是为什么十位那里Q接的与非门要连一根线到个位这里的与门。如果不连这根线，那么刚到0101就会使得十位清零（脉冲一直在动），但是实际上要等到59的时候才行，所以需要再满足十位那里是0101且个位那里是1001的时候才清零。同步级联法这部分就是比较麻烦，你看异步级联法这块很简单，因为只有个位进位会带来脉冲，但是十位它脉冲一直有，你要防止它才到51就归0了

另外注意有一个与门没有非，不要搞错了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031900651.png)

这道题是83，是5乘16+2再+1，+1是因为用了置数，无论对163还是161都是同步的，根据连接反推N需要加1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031901634.png)

由于LS本身就可以实现十进制加减法，所以个位的那个不需要额外调什么东西（比如清零之类的），只需要让它产生借位的那个信号就行

然后十位的那个接Q3是对的，因为它自己减到0之后会回到1001而不是我们想要的0101，因此需要在它出现1001之后异步置位0101

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031901578.png)

接下来看同步级联法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031901325.png)

因为只有CP_U=1且CP_D上升沿才能实现减法，如果只是CP_D上升沿但CP_U=0的话就不减

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031901203.png)

100进制

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031902967.png)

由于是同步的，所以只有当十位是9，且个位是9的时候才能对十位清零。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031902549.png)

异步清零连接起来简单，而且我感觉分析起来也是简单的。

熟悉一下这种可变进制的，其实就改了一下置数的规则，让它有两种置数的触发方式

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031902706.png)

把LD写出来，LD=-A Q3 Q0+AQ3 Q1 Q0。那A=0的时候就是Q3Q0引发置数，这里用的是LD，无论161还是163都是同步的，所以Q3Q0=1001对应十进制（而不是九进制）。而A=1的时候Q3Q1Q0也就是1011，是11，那么对应十二进制。

下面这题很重要，也比较难，因为需要的功能比较多，连接不简单。之前的例子都是十位清零时顺带着个位就清零了，但是这题不一样，需要有一个对它们同时清零的，因为不是整数倍的关系。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031902805.png)

注意，说了是8421BCD编码，那么个位就必须是10进制计数器，不可以搞成6×6，这也是这题麻烦的地方，归零的点不在一个周期的末尾。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031903623.png)

注意这玩意CR和-LD都是异步的

异步级联简单我先讲异步的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031903179.png)

由于都是异步清零置位，所以N就是N。当个位到达1010，立刻个位清零，立刻十位加1（CPU产生上升沿），所以这里用了一个接到Q3和Q1的与门。除此以外，当十位到达0011（3），个位到达0110（6），立刻个位十位置零（其实也是清零，只是由于个位清零端被占了所以用了置数端）。就这三个功能，个位清零、十位加一、到达终点全部清零。

同步级联

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031903219.png)

同步级联的难点在于，CPU一直有脉冲，但我们只希望个位进位的时候才十位进位。这里要搞清楚-CP的功能。

假设跟个位清零一样用1010，那1010到来时的上升沿和CP到来时的上升沿共同作用于CPU和CPD，会出现冲突，容易导致十位的变成减法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031903654.png)

如果给十位的CPD改成Q3Q0$\overline{CP}$，那么Q3Q0在1001的时候已经在等着了，等到CP的低电平期间CPD就变成1准备着，到CP上升沿来的时候就可以正常加

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031903741.png)

这里我一开始有一个疑问，就是CPD在那个瞬间也会有个下降沿，这会不会导致影响呢，不过问了说不用考虑这个，那就都按这个方法来就行。

### 一般时序逻辑电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031904843.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031904929.png)

这个还好，想要产生序列其实我感觉用数据选择器更方便，这里如果你要从0000到1001映射到Z的那还需要画卡诺图呢

### 集成计数器设计思路

务必注意看清楚题目给的功能表，不要背功能表想当然套。尤其要区分清零和置数是同步还是异步。

如果题目说是BCD8421编码的，务必注意个位要用十进制的

一般有三种考题

第一种N进制的N在集成计数器范围之内，那就最简单了用一个板子就行，要么清零要么置位，如果是清零，163用N-1的二进制，161用N的二进制。如果是置位，两个都一样，都是N-1的二进制

N进制的N在集成计数器范围之外，就需要同步级联和异步级联。选好十位个位的进制之后，也要分情况。第二种考题是直接相乘即可，比如60进制计数器，个位10进制，十位6六进制，这种的话课本有直接的例子。

第三种考题是相乘之后还有取余，比如36=3×10+6，此时你需要做三件事情，个位到达10的时候个位清零、十位加一，以及到达36的时候的全部清零。其实个位到达10清零和到达36的时候全部清零都是比较容易理解的，但是务必注意十位加一的那种，如果用了同步级联，需要用上-CP，这个可以自己详细去考究一下时序，这里我只是从经验的角度说它基本都会出现，而且第一次做自己想的话可能很难想到。

161也可以做减法计数器，把每一位反过来输出就行。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031904172.png)

## 555集成定时器

这一章就一句话，背图（3种连接方式）、记结论（时间怎么算）

CC7555

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031905334.png)

这张图不用背，一般题目会给

8是VDD，1是GND，不用管。

5是2VDD/3，作为基准，6：VTH是用来比较的。2：VTL也是用来比较的

6高于2VDD/3则R=1，否则R=0。2低于VDD/3则S=1，否则S=0

4是直接复位引脚，如果4输入0那么Q直接变成0

3是输出端，和Q一样，我觉得加非门是提高驱动能力

当7有上拉电阻，那么沟道会生成，-Q拉到地。7本身也可以做输出端

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031906523.png)

那三个R把VDD平均分压到两个运放的各一个输入端，运放没接反馈就是单纯的比较器，就把+>-输出当作1，->+输出当作0。然后RS触发器功能一样的。而接的两个非门是为了延迟输出，因为非门状态变化也需要时间。

-RD用来控制Q是否置零，5脚通常接个小电容用来滤波的，减少VDD的波动带来的影响，有些时候用来调波形发生器的上下的距离

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031906869.png)

5接小电容滤波防止电压改变。

4接高电平不复位

### 信号发生电路（多谐振荡器）

多谐振荡器其实就是输出方波，但是不要写方波发生器，考试问你你就写多谐振荡器就行。

方波占空比50%，矩形波就占空比不一定是50%

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031906151.png)

看到这个电路就是多谐振荡器，其实8，4，5，1都是一样的接法，主要看2，6。2和6都小于VDD/3，则Q=1，2和6在VDD/3到2VDD/3，则保持，大于2VDD/3则Q=0。这里你可以理解为6是R，2是-S，它们连在一起。如果电平高那就输出0，如果电平低那就输出1，如果在中间，也就是1/3到2/3的VDD，那就保持。

R1，R2和C是定时元件，控制多谐振荡器的占空比之类的

现在7通过R1上拉，然后VC控制2和6。

2和6是运放的两个输入端，可以虚断当作没有。一开始VDD给电容C充电(τ=(R1+R2)C)，电容电压增加，这个过程中R和S的输出状态会变化，一开始是R=0，S=1，Q=1，然后多一些是R=S=0，Q保持，然后是R=1，S=0，Q=0.当Q变为0，你可以认为T那里连出来就是地，于是C又开始放电(τ=R2C)，回到R=S=0的状态，然后又充电又放电。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031906047.png)

第一次充电时间会长一些，τ=(R1+R2)C，ln是ln(VDD-0)/(VDD-2/3VDD)=ln3。所以是τln3，而后面的T2就变成τln2了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031906488.png)

你实际做的时候绝对不会像右图这样分析，你看左图就知道了

找充电/放电流向中经过的电阻来算τ，电容都是同一个。

$$
\begin{align}
T_1&=R_2C\ln 2\\
T_2&=(R_1+R_2)C\ln 2\\
T=T_1+T_2&=(R_1+2R_2)C\ln 2\\
占空比&=T_2/T=\frac {R_1+R_2}{R_1+2R_2}\\
\end{align}
$$

我发现直接记忆τln2即可，你看充电的时候对应T2，τ是(R1+R2)C，而放电的时候对应T1，τ是R2C，这就比较简单了

解释ln2的由来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031907872.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031907421.png)

本质上是一个信号发生电路，这边可以callback模电部分的非正弦波发生电路，还是挺像的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031907040.png)

用上τln2的结论直接就得到了

充电就是从VDD到电容，放电就是从电容到7脚，具体的机理不用理解，会算会画图就行。

再来一个电路

这里要看清楚究竟是谁控制的VO，6是高触发端，连着C2，而2是低触发端，连着C1。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031907270.png)

VO是1就是充电，0就是放电。一开始VC=0所以置位，所以充电。6是R，2是-S。需要等到6的reset信号变成1才能把vo变成0，才能开始放电，和连到2的vc1没关系。在这里区分0和1的是VDD/3和2VDD/3

一开始C1和C2的V都是0，给他们分别充电，C1是VDD→R→D1→C1，C2是VDD→R2→RP2→C2，状态变化由C2的电压决定，因为第一个看6，当C2到达2/3 VDD时输出就跳到0，此时VC1早已几乎充满。接下来开始放电，C1是C1→RP1→R1→7(GND)，C2是C2→D2→7(GND)，状态变化由C1的电压决定，因为第二个看2。当C1到达1/3 VDD时输出跳到1，此时C2早已几乎放电完全。

我说明这个ln3哪里来。T1是VDD对VC2从0充电到2/3 VDD，所以是ln(VDD-0)/(VDD-2VDD/3)=ln3。而T2是0对VC1从VDD放电到1/3VDD所以是ln(0-VDD)/(0-VDD/3)=ln3。两个都是ln3

图中莫名其妙把后面的高电平画的短了一些，这是不对的，这个的T1和T2从始至终都一样，和原来那种需要启动的不一样。

$$
\begin{align}
T_1&=(R_2+R_{P2})C_2\ln 3\\
T_2&=(R_1+R_{P1})C_1\ln 3\\
T&=T_1+T_2\\
占空比&=T_1/T=\frac {(R_2+R_{P2})C_2}{(R_2+R_{P2})C_2+(R_1+R_{P1})C_1}\\
\end{align}
$$

ln3的由来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031908862.png)

通过改变5脚的电平导致窗口变小，这样上下的幅度就小了，但是充电速度也变了，这里计算充电时间需要改成τln(VDD-V5/2)/(VDD-V5)，而放电时间是τln(0-V5)/(0-V5/2)还是τln2，但是充电时间可能会变

### 单稳态触发器

不可重触发的单稳态触发器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031908418.png)

这是有输入的，对2输入。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031908649.png)

输入负窄脉冲，且过渡过程结束前都不允许重触发

Cd和Rd是微分电路，用来把vI转化成v2作为输入。当v2跳变到0，运放C2导致S=1，Q=1，输出vo跳变到1，此时7也就是那个FET管截止，7可以当作断路，这时VDD给C充电，τ=RdCd，过渡过程很快结束。在vc充电到2/3 VDD之前，v2回到高电平，当vc充电到2/3 VDD，运放C1导致R=1，此时R=1，S=0，Q变成0，C放电，tw=RCln3

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031909022.png)

7脚和6脚相连，有反馈

如果把充电的改成恒流源

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031909467.png)

那么给C充电的电流就是恒定的I，充电时间(对应图中的tw)也就是$\frac {2V_{DD}C}{3I}$(用CU=Q=It来推的)

可重触发的电路是下面这样的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031909433.png)

当vI=0到来，C可以经过T1放电（vc被钳制在低电平），这里一开始C本身就没有电就不放电了。另外vI=0也会导致vo=1，因为初始vo是低电平，变成高电平就是看2的。当vI回到1，T1截止，VDD对C充电，充电到2/3 VDD就导致vo跳变为0。接下来看可重触发是怎么体现的。可重触发就是vc还没到达2/3 VDD的时候你再给一个vI低电平，那么vo高电平的时间会被延长，因为vc在vI低电平的时候完成了放电，那就相当于重新计时了。而之前那个之所以不能重触发，是因为vI和vc之间没有相互影响的方式，所以你就算再给一个vI低电平，也无法使得计时重置。

可重触发的这个满足tw=tw'+tpd

tw'仍然是RCln3

我觉得这个没必要搞明白其中的电路原理，直接记波形和时间就行。

### 施密特触发器（滞回比较器，双稳态触发器）

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031910282.png)

低于VDD/3置一，在VDD/3到2VDD/3保持，超过2VDD/3置零

这里可以复习模电部分的比较器-滞回比较器的内容，上触发电平是2/3 VDD，下触发电平是1/3 VDD

没有定时元件，有输入则有输出，不存在过渡过程。

有一点应用不过完全没有展开

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031910028.png)

### 题目

识别三种类型，波形，算时间

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031910818.png)

没有输入vI，只能是多谐振荡器。

第四题，R1Cln(12V-5V)/(12V-8V)，这个ln肯定是正值，要是分不清初态末态自己调整一下使得ln里面大于1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031910516.png)

1是一个单稳态触发器，因为K短暂闭合断开相当于窄脉冲。我觉得这里用“有没有输入”来看还是有些难看，我建议看充电放电通路。如果观察到放电通路没有电阻，比如这里C1放电往7走直接降为0，那就确定是单稳态触发器了。

tw是RCln3

K断开时VO1是0，VO2是0，第二个555被复位了

第二个555是多谐振荡器，用第一个555的输出来进行调制，当II的4脚为0，那么输出就是0，如果II的4为1，那么就有过渡过程在震荡。

维持2.2ms，说明vo1为高电平时间至少2.2ms。而单稳态触发器高电平时间为tpd+tw，tpd这里没有给就直接忽略了，于是就是R2C1ln3=2.2ms求一下就行

第四问也简单啊，就是看低电平时间，看放电通路R4C3ln2就行。

多谐振荡器一定没有输入（即VI），有RC。单稳态触发器2脚输入，有R有C。

施密特触发器有输入有输出无时间常数所以没有外接RC

这三种在一道大题里考。

只要识别出是哪种名称，波形就出来了，直接记

注意单稳态是RCln3，多谐是RCln2，不过最好还是搞清楚这个3和2是哪里来的，如果时间不够的话就直接记吧。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031911595.png)

放弃分析（内部原理），判断出类型直接套结论。这里放电通路上没有电阻，是单稳态触发器。手碰一下意思是窄脉冲。时间显然就是tw=RCln3，直接算

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031911806.png)

多谐振荡器

注意，多谐振荡器的反馈如果不接7脚的话，接3脚也是一样的。3脚和7脚本来输出就一样。充电回路是从vo（VDD）到c充电，放电回路是从c到vo（0）放电

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031911152.png)

图直接背就行。

## AD, DA

这块考概念多，而且不会考多难，建议多看看书。

### DAC

digital-to-analog convertor，数模转换器，从数字量转变为模拟量

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031911129.png)

根据并行数字输入，正比例地输出一个电流，然后把电流变成电压，这里有虚地这样电流直接流过去电压和电流就正比了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031912739.png)

要具体实现这个D/A转换器有这样的电路，这种叫倒T型。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031912404.png)

由于运放接了负反馈，所以这四个开关S不论打到哪一端都是连接到虚地，这个电阻配置的特殊之处在于，无论从哪个节点到地都是两个2R并联，这样就保证每个节点分流都是一半一半。而d用来控制每个S接哪一段，如果d是1那就打到反相输入端可以转化为电压，d是0就打到同相输入端。流向反向输入端就是送给vo的，流向同相端的就是流到地的。

从VREF看，到地的电阻是R，所以总电流I=VREF/R

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031912094.png)

对于n位的，当Rf=R，电流就是-VREF/2\^n 乘以D，D就是你传进去的二进制数，这是符合直觉的，相当于把VREF分成了2的n次方份，根据输入量进行输出

上面这种属于单极性输出的D/A转换器，因为只能输出一种极性的，如果想要双极性的是下面这样实现的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031912096.png)

电路结构和前面的倒T不一样，这里是通过电阻不同来使得流过电阻的电流不同，多接了一个-VB和RB。由于反相输入端是虚地，所以流过RB的电流只由RB和-VB决定，和左边的没关系，要控制IB始终为IMSB。这样，设ILSB，也就是4R那个地方接VREF的电流为1的话，那IMSB对应的电阻R接VREF的电流就是4，现在要让IB保持是4，这样如果i=0，那么io=-4

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031913363.png)

这里偏移码是补码的符号位取反的结果，是实际控制S的码。当偏移码为111时，IMSB和IB是抵消的，io只由2+1=3提供，这样就实现了既可以输出正的也可以输出负的。偏移码保证了输出是单调的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031913761.png)

对DAC定义几个技术指标

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031913042.png)

线性度（又称非线性）定义为（实际输出值和理想值的最大偏差）/（满刻度值），用百分数表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031913174.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031913226.png)

转换精度是“最大的静态转换误差”，包含非线性误差，增益误差，零点误差，漂移误差等综合误差，不要求算。

精度和分辨率不同，精度是转换后的实际值对于理想值得接近程度，而分辨率是指转换器能够分辨的输出模拟量的最小变化量。分辨率很高的D/A转换器不一定具有很高的精度。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031914696.png)

量程是最大模拟电压和最小模拟电压之差，名义满刻度比如是10V，但是其实最大输出电压是(2\^n-1)/2\^n乘以10V，而不是真的10V，所以不能把它用满

集成\*的不考

### ADC

analog-to-digital convertor，模拟信号到数字信号

模拟信号到数字信号分为==采样、保持、量化、编码==四个步骤，采样-保持是一对，量化-编码是一对。

零阶保持采样

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031914291.png)

根据信号与系统那边的采样定理知道，对于带限信号$v_I$，采样频率$f_S>2f_{i(max)}$才能还原，通常取2.5到3倍

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031914076.png)

两个运放都接成电压跟随器

量化-编码本质上是在做一个分类，把连续的分为离散的。规则比较简单，常见的有两种规则

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031914448.png)

$V_{im}$是最大输入电压，n是n位ADC，怎么求S的公式都已经写在图里了。

只舍不入就是向下取整，有舍有入就是四舍五入，量化误差$\varepsilon=v_I-v^*_I$，带星的是量化后的

有舍有入的用的更多

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031915580.png)

我解释一下这里S的计算的差异，vim指的是横坐标那个输入的最大值，在这两个情况下输入最大值都是8。为什么只舍不入那个除的是2的幂而右边的是还要减去0.5呢，这个是啥。这个看的是要把横坐标分为几段，左边是把0到8分为八段，而右边比较特殊，它其实只有7.5段，最开始的部分，也就是0到0.5的那部分占的宽度只有其余的一半，我觉得暂且解释到这里把，虽然感觉还不太清楚不过我觉得有个印象就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031915966.png)

#### 逐次逼近型

逐次逼近型就是基于反馈来确输出，电路图不用看懂，只要知道是上面的VI'和VF在作比较就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031915900.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031915884.png)

能看明白这个表就行

逐次逼近型转换速度快，对n位的转换一次的时间为(n+2)Tcp

#### 双积分型

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031915267.png)

这部分课本讲的还挺清晰的，看课本

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031916492.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031916533.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031916846.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031916286.png)

技术指标方面也定义了分辨率，还定义了一些误差，看看就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031916033.png)

### ADDA考法

只考概念，不考具体的电路。背就完事了，关注数字量模拟量的转换计算，以及分辨率

## 存储器*

ROM，RAM不考（在2.5分数字电路分析与设计）

RAM停电后数据清空，ROM仍然能保存数据

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031917627.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031918002.png)

ROM没有输入和写引脚

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031918087.png)

其实写成1Kb就懂了，如果每个存储单元是8字节也就是1Byte，那就是1KB

RAM的操作过程就是片选-用地址选存储单元-用读写信号进行操作

举一个从ROM里取信息的操作

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031918476.png)

地址部分，其实就是用两位来搞出4个基本事件来控制W，每一个W为高电平的时候，可以从D取出4位的输出，就作为这一个地址存的数据，想要修改那你就得要改内部的二极管，具体对应关系如下表

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031918347.png)

下面这个图没看懂，课本也没有详细展开

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031919932.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031919658.png)

这个图我觉得也没必要看明白，这个东西是SRAM，用的是NMOS，除此以外还有CMOS（容量大功耗低）和双极型的（速度快），没有展开

外部扩展我就不写了，微机原理部分有学。

本页总阅读量<span id="busuanzi_page_pv"></span>次