# 数字电路

## 写在前面

这篇笔记基于《集成电子技术基础教程 第四版 下册》以及张德华老师2026春夏学期《数字电路分析与设计》（2.5分）整理而来。里面关于考试范围的表述（如XX不考）仅供参考，以老师实际公布的考试范围为准。

与其他笔记类似，这则数电笔记是我通读教材之后，保留关键信息，建立逻辑联系而形成的，包含我学习过程中的见解，希望能帮到初学者以及复习的人。可以说看过我这篇笔记之后，教材中的大部分内容都是不用看的。

-A表示非A，这个不是标准写法，标准写法是$\bar A$（写成latex是\bar A），我写笔记的时候有时偷懒就写成-A，知道是那个意思就行。

## 数字逻辑

模拟信号可以设置阈值来离散化，转化为数字信号

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031626796.png)

数字信号有更好的抗干扰作用

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031626911.png)

脉冲包含0（低电平）和1（高电平），0到1是上升沿，1到0是下降沿，先有上升沿再有下降沿称为正脉冲，反之称为负脉冲。对于上升沿下降沿不是瞬时完成的非理想脉冲来说，定义了上升时间tr，下降时间tf，脉宽tw的参数

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031628426.png)

在时钟脉冲波形的一个周期内，二进制序列的值是不变的，对于这个图来说，二进制序列的跳变都发生在时钟脉冲的上升沿。（如果改一改也可以改成发生在下降沿，不过此时时钟脉冲的一个周期就不是从上升沿开始了）

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031629976.png)

分频处理就是输出信号的频率变成原来信号频率的1/2(vo1)，1/4(vo2)

数字信号的传输分为串行和并行。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031629733.png)

串行是一位一位传，并行是一次性把所有位传，这里演示的是8位的系统，那就一次传8位。串行速度慢，并行速度快。长距离情况下选串行

信号传输的时候还需要有一个共地拉在一起

### 数制转换

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031629473.png)

367O的O表示是八进制，F85H的H表示是十六进制

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031630841.png)

注意是看余数，而且最后是倒过来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031630247.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031630405.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031630975.png)

这里我写的看不懂也没关系，只是对原理进行解释

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031631273.png)

注意小数点以左是从小数点开始三个三个组一起（8进制），16进制就是4个4个组。最后不足4个的左边补零凑成3个或4个。对于小数点往右的也是类似的，也是从小数点出发组，此时是往右补零凑成3个或4个

补充一个东西，LSB和MSB，分别是least significant bit和most significant bit的缩写，分别表示最低位和最高位，我觉得把它理解为权重最小（最不重要）和权重最大（最重要）更好记忆这个significant

除了数制转换，还有用二进制数来表达十进制中的十个数字的编码的方式，叫做BCD码，Binary-Coded Decimal，就是二-十进制编码。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031632514.png)

有权码就是0=8×0+4×0+2×0+1×0，于是得到0000，其余的有权码类似。不过其余的有权码并不是一一对应的关系，比如6既可以用5+1也可以用4+2，在这里选择了5+1，大概是优先用更前面的位出现的来表达。2421可以做到N对应的码按位取反之后就是9-N，比如0对应0000，取反1111就是9，1对应0001，取反1110就是8，而8421做不到这一点，总之就是有某些方便，设计出来是有意义的。无权码中的余三码是在8421的基础上+3得到。循环码的特点是每一位和下一位之间的差别只有一个digit，这样转换就比较容易，后面会介绍怎么生成循环码

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031632285.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031632018.png)

直接说BCD码没说是哪种那就默认是8421BCD码

务必注意8421BCD码和二进制数是不一样的，在十以内虽然一样，但是超出十之后，BCD是每一个数用4位来编，比如这里369是拆成了3和6和9分别用8421来写。

余三循环码和循环码并不是每一个+3的关系，这个搞起来比较复杂，不用管它。总之你知道余三循环码0000对应的是0010，而且满足每加一则编码只变1位即可。而且余三循环码很少见，不用关注。

### 原反补

原码反码补码是因为计算机里减法不容易实现所以把减法都改成加法的计算而研发的

计算机求5-3

转化为5+(-3)

5的原码是0101，-3的原码是1011(我们假设用4位有符号，第一位是0说明是+，第一位是1说明是-，剩下三位和三位二进制一样)

5是正数，正数的补码和原码相同，都是0101

-3是负数，负数的反码是符号位不变其他取反，-3的反码是1100，补码是反码+1，是1101

补码相加，0101+1101=0010(只截取最后4位，进位的那个舍掉)，相加得到结果的补码。由于第一位是0，因此结果是正数，直接得到结果是2（补码就是原码）

求3-5

3的原码0011，-5的原码1101，3的补码0011，-5的反码是1010，-5的补码是1011

补码求和，0011+1011=1110，第一位是1，结果是负数，要把补码1110转化回原码。1110-1=1101，这是反码。1101除符号位取反，1010，这是原码对应-2，这就是结果

给出两个二进制数让你运算，相当于给出原码给你运算，但是你要自己补一位符号位才能用原反补的逻辑来做。不过其实不用原反补的逻辑也可以做，就用基础的进位借位规则即可，计算机由于其局限性需要用原反补，不过你自己做的话就怎么舒服怎么来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031633255.png)

格雷码(循环码)的生成过程

一位的只有\[0, 1\]

要生成2位的，写出原来一位的\[0, 1\]，然后倒序再写\[1, 0]，给原来的前面补0，给倒序的前面补1，两个序列拼起来就得到了\[00, 01, 11, 10]

要生成三位的，写出二位的\[00, 01, 11, 10]，倒序\[10, 11, 01, 00]，给原来的补0，给倒序的补1，拼起来得到\[000, 001, 011, 010, 110, 111, 101, 100]

### 逻辑

与

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031633297.png)

用AB表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031633771.png)

或

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031634103.png)

用A+B表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031634001.png)

非

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031634908.png)

用$\bar A$表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031634958.png)

注意，三角带圆圈是非门，如果是只有三角没有圆圈的叫缓冲器，用来增加驱动能力的，有微量的延时。国标符号是只有1，没有圆圈。

与非，也就是把与的真值表的结果部分都反过来

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031636836.png)

用$\overline{AB}$表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031636007.png)

或非，就是先做一个或运算，再把结果取非

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031636385.png)

用$\overline{A+B}$表示

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031636562.png)

与或非，把它当作一个整体来看待，就是先与再或再非

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031637068.png)

用$\overline{AB+CD}$表示

想要测试与或非门，可以分组测。比如你想要测试其中一个&，那你就要令另外一个&没用，那只要让希望没有的那个的其中一个端子接地就行，那那一侧的输出就是0，接下来就测试还能用的&。如果希望一个端子无效，那就把它接高电平。

异或，这个很重要，也相对麻烦。要记住是如果不同，那么就是真，如果相同就是假。不用管这个“或”，看到异或的异之后就知道是不同才为真，这样就不会和同或搞混。异或和前面的与非或非什么的不一样，它的输入只能是两个，而不能增加。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031637240.png)

异或的规律是奇数个1异或是1，偶数个1异或是0，就是(((A异或B)异或C)异或D)这样。

和0异或值不变，和1异或取反，异或有交换律和结合律，连续异或可以任意换位置，从而可以比较好地处理比如((A异或B)异或-A)，就可以直接简化成1异或B，也就是-B

同或，同或和异或的结果是相反的，所以外形符号不再搞一个新的，而是在异或的基础上在输出的地方加一个圆圈，这个需要区分好谁对应谁。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031639646.png)

### 逻辑代数

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031640483.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031640914.png)

第三个建议记忆，有些时候还挺有用的，而且不容易直接想到，本质上是从A那里再补一个AB之后组合形成，起到了化简效果。

第④个建议这样记忆，就是把BC拆成ABC和(-A)BC，那么ABC已经被AB包含了，(-ABC)已经被(-A)C包含了，那么BC就可以消掉

逻辑代数可以完全转化成集合运算。在逻辑运算中，ABC等符号只能取0或者1。如果要搬到集合，那么直接写出来的0就是空集，直接写出来的1就是全集，在A以内对应A=1，不在A以内对应A=0。乘对应交集，加对应并集，运算规律完全一致。

以上的公式用韦恩图都可以显然地得到

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031640541.png)

对偶规则补充一条顺序不变，不调整bar。对偶和反演不是简单取反的关系，反演律和德摩根定律没有区别。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031641037.png)

关注一下反演的时候，如果有整体的bar，那只换一次

### 逻辑问题的表示方法

对于灯亮不亮的问题

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031642665.png)

可以用真值表

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031642328.png)

可以用表达式（不唯一）

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031642242.png)

要学习不同类型表达式的互化，这里的A-B表达式的含义是内层为A，外层为B，比如与-或表达式就是内部是与，比如AC和BC，而外部是或，也就是把AC和BC分别作为一个整体，来进行一个或的操作。其他也类似的，比如与非-与非表达式，内部是与非，外部也是与非。

可以用逻辑图（根据表达式来），以及波形图

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031642258.png)

还有一种叫卡诺图，以后再介绍

### 化简和最小项最大项

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031643446.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031643339.png)

通过真值表可以很容易看出最小项和最大项的对应关系。A+B=1意味着不是(A, B)=(0, 0)，和$\bar A\bar B$是对立事件，其实用德摩根定律很容易看出来。

那么从1.2.1那个表达式怎么转变成1.2.2呢，我不希望每次转变都要想个半天，能否提供一个符号化的流程，有的兄弟有的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031643961.png)

那么公式化处理方法就是找到标准与-或表达式的那些事件的对立事件（写成基本事件的和的形式），然后把这些事件从积改为和，然后把有杠的改成无杠的，把无杠的改成有杠的，然后把这些积起来，就是标准或-与表达式了。

总结一下，最小项就是两两互斥的基本事件，最大项就是不发生这个基本事件。比如对于(0, 0, 0)这个事件，$\bar A\bar B\bar C=1$代表这个事件发生，而A+B+C=1代表这个事件不发生，是对立的关系

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031644496.png)

逻辑函数的化简

标准的是按最小项或最大项写出来，而最简的是让项数最少且项内的变量最少

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031644587.png)

在这几种化简方法当中，吸收变量法和配项法和合并项法是相对比较熟悉的，因为都是集合运算里的直观表现，而消去变量法和消去冗余项法是需要额外关注的，因为没那么直观。证明方法在逻辑代数那个section有提及

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031645910.png)

以上是代数法，还有卡诺图法的化简

先看各个变量数量的卡诺图的样子，卡诺图和格雷码类似，相邻的只有一个变量不同，框内部的m几不用记忆，直接根据A和BC对应的数值算出来即可

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031645421.png)

三变量和四变量的一般就是用卡诺图化简

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031647367.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031647014.png)

填的时候相当于找基本事件

实际在化简得时候，先把对应位置填上1，其余为0，然后开始画圈。画圈要求只能圈相邻的2的n次个，注意卡诺图是循环的，所以下面这个题的四个角其实也是相邻的。最常见的画圈其实也就是正方形的一个框或者横竖这样圈，要保证所有1都被圈到，而且不能圈到0，同一个1可以被圈到多次。

卡诺图本质是让AB+-AB出现，从而可以只剩下B这样消去，是通过控制相邻的只差一位来做到的。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031648571.png)

在画的时候务必先看四角有没有全1，如果有的话优先圈这个，这个比较容易漏掉，因为在空间上看它最不容易被想到是相邻的

我觉得一个很让人迷惑的点就是这样圈的方式其实不唯一啊，你怎么保证你圈的方法就是最简的那个，我感觉还是没有讲明白

需要纠正一个误区，并不是重叠的越多越不好，最终还是要落到项数最少且每一项的个数最少，比如下面这个如果你分开两个圈，得到没有重叠的A+-A-D，不是最简，而是A+-D才是最简。我觉得核心是每圈一次，都应当用尽量大的来圈，因为越大的表达式就越简单。而且圈的次数增加时必须有之前没圈到的，这样才是有贡献的，不然只是增加表达式冗余项。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031648414.png)

有些时候逻辑函数给的时候会用Σ和m的数字的方式，这个时候你只要把那些数字改成二进制的然后再去找就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031648697.png)

比如这里1就是对应ABCD=0001,3就是对应0011，以此类推就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031649595.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031649126.png)

其实你得到与或之后直接就可以得到或与，按我之前的那个方法，这里是展示通过圈0来得到最小或与表达式。其实圈0也不难，你想，圈1得到的是L=若干基本事件，那圈0不就是-L=若干基本事件之和吗，所以L就是对整体取个反即可

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031649433.png)

原来这里就已经介绍了如何得到与非与非和或非或非表达式。

含约束项的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031650460.png)

注意看约束条件和那个d的关系，这里约束条件等于0，意味着这四个基本事件不会发生，所以这四个基本事件在卡诺图中的位置可以被标成×，可以用d的那个来表示。等于0意味着不发生，意味着这些可以标成×

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031650585.png)

约束项可以被圈进去也可以不圈，总之只要让最后圈出来的那些表达式最简就行。约束项就是d的那些

### 互化

四种标准表达式：与-或表达式，或-与表达式，与-非表达式，或-非表达式

四种里任选两种，共有6种互换

不过我感觉可以改一下，不用记那么多。因为与-或表达式是我们最熟悉的，我们也懂得如何把任何表达式化为与-或表达式（标准或最简），于是我们只需要从与-或表达式出发，得到其他三种表达式即可。例如我想要把一个或-与表达式转为或-非表达式，那么我们先把或-与表达式化为与-或表达式，然后再把这个与-或表达式化为或-非表达式即可

其实与-或表达式转化为或-与表达式也不用另外学，我前面讲过了，可以从直观理解来看，它们就是互为相反的东西。唯一可能带来麻烦的就是你需要把一个东西先变成标准与-或表达式，比如A+(-A)B这个东西应该换成AB+A(-B)+(-AB)，这一步其实不难，你只要把基本事件都找到即可，于是它的标准或-与表达式就是对应“不发生-A-B”，那就是(A+B)

另一种得到最简或与表达式的方法就是卡诺图圈零

怎么从与-或表达式得到与-非表达式呢，一个通用方法是取两次反，然后对内层使用德摩根定律

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031651756.png)

注意要先得到最简与-或表达式才做这一步

其实不难发现，就是希望使用德摩根定律来换，可以把相乘变成相加。原本是与-或表达式，经过一个取反之后内部变成了与，这样就是与-与，还带着非。而如果希望搞到或-非，那一开始应该有个与，事实上从或-与表达式经过取反就可以得到都是或-或的逻辑了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031651892.png)

这道题很重要，演示了要如何处理

第一题相当于把Z改写成与非表达式，现在已经有的是一个或与，应该先转成与或再用德摩根定律转。这里先用卡诺图做一个化简，可以把Z改成$A\bar B+\bar A C+B\bar C$，接下来流程就固定了，添两个取反号还是等于原来的

$$
\overline{\overline{A\bar B+\bar A C+B\bar C}}=\overline{\overline{A\bar B}\cdot\overline{\bar A C}\cdot \overline{B\bar C}}
$$

这样就已经是一个与非逻辑了，因为从内到外都是与和非，没有或

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031652113.png)

第二题要改写成或非表达式，根据刚刚的分析，应该转成或与表达式再用德摩根，也就是先改写成最大项之积，这里画了卡诺图之后得到$Z=(\bar A+B+C)(\bar A+\bar B+\bar C)$，接下来同样的做两次取反

$$
\overline{\overline{(\bar A+B+C)(\bar A+\bar B+\bar C)}}=\overline{\overline{\bar A+B+C}+\overline{\bar A +\bar B+\bar C}}
$$

这样就也是一个或非逻辑了，内外都是

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031652097.png)

## 集成逻辑门电路

### 静态原则

假如把0到2.5V归为0，2.5到5V归为1，那如果得到的是2.5V就不好解释了，为了避免这种情况设计了以下规则

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031652380.png)

不允许发送禁止区域的电压

由于信号传输时会有噪声，可能本来传的是有效区域，但是加入噪声之后进入了禁止区域，为了避免这种情况设计了噪声容限

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031653667.png)

定义逻辑0的噪声容限$V_{NL}=V_{ILmax}-V_{OLmax}$，逻辑1的噪声容限$V_{NH}=V_{OHmin}-V_{IHmin}$。这里其实我感觉究竟是O-I还是I-O经常容易记混，我觉得如果只是为了得到噪声容限不去检查关系的话，你就记住VNH是H的减H，然后VNL是L的减L就行，减完加个绝对值，就是这个容限肯定是正的，就这么做就行，或者如果题目直接给了你具体数值，那就更简单了，你就知道它减完一定是正的，那就大的减小的就行。

下面的各种逻辑门在一个接下一个的时候都要满足VOHmin≥VIHmin，VILmax≥VOLmax

下面具体的TTL和CMOS，必须搞清楚任何一个端，接高电平、低电平、悬空、连电阻接地分别会出现什么。

### TTL

#### 推拉式

TTL与非门，其中TTL的T是transistor也就是晶体管的意思，L是logic，整体是transistor-transistor logic

CMOS是Complementary Metal-Oxide-Semiconductor

TTL电路的多余输入端尽量不要悬空，以免干扰，特别是复位端和置位端。对TTL来说，悬空视为高电平。

典型电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031656625.png)

我不建议详细了解里面的推导过程，因为我觉得都讲的不够明白，我自己也没有搞明白。不过要掌握的只需要知道输入是什么样的时候对应输出是什么样就行。左边T1有两个e出来，这两个e如果都是高电平，那么T1会进入倒置状态，发射结反偏，集电结正偏，此时T2T5正向导通，T4截止，Vo的值相当于T5的VCE。这里导通都认为是深度饱和状态，至于为什么是这样不用管，总之这里不会有放大状态出现。那么Vo对应T5的VCES也就是0.3V，对应深度饱和时估算的VCE，此时输出低电平

当T1的两个e至少有一个是低电平时，T1会进入深度饱和状态，为什么是这样也别管，此时T2和T5截止，T4导通。此时Vo从VCC经过R2经过T4的VBE经过D来求。R2上压降忽略，于是就是VCC-0.7-0.7=3.6V，此时输出高电平

了解都这里就够了，不要深入去想，费时费力还没什么用处，也不会考这种内部电路的分析，那是模电的事情

在这个电路的基础上改进得到下面的电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031657025.png)

换成肖特基二极管开关速度更快，同样不用具体分析其中的过程，只需要知道ABC输入都是高电平，则T5深度饱和，则输出0.3V低电平。当ABC输入不全为高电平，T3T4导通，忽略R2压降，得到输出5-0.7-0.7=3.6V，到这样就行

这个改进电路的电压传输特性是这样的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031657001.png)

图中开门电平Von对应VOLmax的位置，关门电平Voff对应VOHmin的位置，阈值电平VT定义为Von和Voff中间的位置，常用1.4V，这个阈值电平其实是简化成了要么高电平要么低电平，就是你输入VI大于1.4V就输出低电平，VI小于1.4V就输出高电平

TTL的VOH典型值是3.6V，是纵轴上面交的那个位置，而低电平VOL典型值是0.3V

以上两个电路都叫做推拉式的结构，也就是一种状态是T5导通T4截止，一种状态是T4导通T5截止，这种类型的不能两个输出端并联，否则如果一个高一个低的输出短路会出问题

再讲推拉式的输入特性曲线

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031657952.png)

解释一下，这里T1的e只接了一个，另一个你可以当作悬空。然后这里VI并不是直接输入的，而是从T1的e拉了一个电阻到地，这个电阻上分到的电压就当作VI了。当电阻小的时候，这个输入电压就少，就相当于低电平，那低电平T1就是饱和区，T2截止，从VCC经R1经VBE经R这样一个串联的路，VI就是5-0.7然后R和R1分压得到的。

当R增加，VI越来越大，直到某个时候终于让T2导通，T1进入倒置状态，VB在2.1（被钳位），那VI就是1.4，后面保持不变，就这样的一个曲线。所以结论就是在TTL的输入端对地接一个大电阻是可以视为接高电平的。而临界电阻，也就是使得VI=1.4V的那个电阻取1.4kΩ，这个数值被称为开门电阻。所以对TTL，输入端到地接一个小于1.4kΩ的被视为接低电平，而接一个大于1.4kΩ的被视为接高电平。而如果TTL输入端开路，相当对地接无穷大电阻，所以会被解读成高电平

我们再研究这种电路下的输出特性曲线

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031657920.png)

$V_{OHmin}$是最小高电平输出电压，只要负载在正常范围内，不会低于这个值。

$V_{OLmax}$是最大低电平输出电压，只要负载在正常范围内，不会高于这个值。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031658231.png)

灌电流和拉电流方向怎么记，你就把左边那个驱动门当作一个朝右的屁股就行。

我们先解释灌电流负载曲线。驱动门输出部分的结构其实是一样的，无论是驱动门还是负载门都是TTL推拉式的。当驱动门的T5导通（饱和区），T4和D截止的时候，负载门的电流就汇聚流过T5，这就叫灌电流。负载门的数量用$N_{OL}$表示，假设它们的I是相同的那么流过T5的电流就是$N_{OL}I_{IL}$。然后当负载门数量增加，流过T5的电流也就是IC就增加，增大到IC=βIB的时候就从饱和区进入放大区。这里我们仅从电流考虑，就是βIB>IC的时候就是处于饱和区，βIB=IC的时候就是放大区，不从VCE作为原因来解释。根据三极管的输出特性曲线，当IC增大的时候VCE也会增大所以VOL会增大（其实io和vo在灌电流的那部分就是三极管的输出特性曲线啊）。但是VOL不能超过VOLmax，这是由后面的静态原则确定的，所以这样就可以反推出最多可以加的负载门个数是$N_{OL}=I_{OLmax}/I_{IL}$，向下取整。需要先根据VOLmax求出IOLmax。灌电流的IIL由限流电阻R1约束，和负载门的个数无关

然后拉电流负载曲线就是变成T5截止T4和D导通

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031658096.png)

类似地，当负载门的数量NOH增加，IOH也增加，那么VOH=VCC-IOHR5-VCE，IOH增加，VCE也增加了（根据三极管特性曲线），所以VOH就减少，减少到VOHmin就不行了。找到VOHmin对应的IOHmax，最多可以加的负载门个数是$N_{OH}=I_{OHmax}/I_{IH}$，向下取整。拉电流的IIH计算时因为负载门工作在倒置状态，晶体管个数会影响IIH

TTL与非门的带载能力用扇出系数表示，扇出系数定义为能驱动的同类门的个数，就看拉电流和灌电流情况下的最多可以加的负载门个数取小者。一般低电平的扇出系数比高电平的扇出系数要小

还有一个指标是平均传输延时时间tpd

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031658247.png)

#### OC

除了推拉式之外，还有叫做集电极开路(OC, open collector)的结构

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031659507.png)

注意菱形加一横的标记是OC门的意思。

这个其实也是类似的，ABC都高电平，那T3导通，输出低电平。ABC有一个低电平，T3截止，输出VCC1，是高电平。输出高电平本质上是因为T3截止了之后RL相当于开路了，所以VCC1直接输出

这种的好处是多个OC的输出端可以接在一起，这种连接方式称为线与

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031659507.png)

比如这样的话，L1和L2只要有一个输出低电平那L就是低电平，因为高电平的本质是断路导致的VCC电压传给L，而比如说L1的AB中有一个是低电平，那L1输出直接断路，但是如果此时L2的CD都是高电平，L2是0，那L还是0

这里OC门的输出高电平是VCC，而不是TTL的3.6V，这里工作原理是开路就直接由VCC输入，否则拉到0

非OC门的与非门输出端不允许直接并联，否则造成输出点的状态无法判断，你看直接这样接那一端的可能流到另一端去

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031659720.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031700441.png)

接个LED，亮了就是输出低电平，不亮就是输出高电平。因为输出低电平本质上是出来的是0，所以VCC到0这条路电流就往下流，所以就亮了。如果是截止状态，那LED也亮不起来，没有电流。

#### 三态

除了推拉式，OC之外，还有一种三态的，三态就是输出可以是0，1或高阻态。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031700279.png)

当EN输入是0，则D1D2下面是1，D1D2截止，那此时其余的电路就和前面的分析方法一样，A输入高电平，T5导通T4截止，输出低电平。A输入低电平，T5截止T4导通，L输出3.6V高电平

当EN输入是1，D1D2下面是0，D1D2导通，此时T4T5都截止，输出呈现高阻态。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031700378.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031700978.png)

学过微机就很好理解做总线，就是三态门输出可以连在一起，只要保证一个在输出的时候其他都在高阻态就行

### CMOS

CMOS电路的多余输入端不允许悬空，其实无论TTL还是CMOS，你自己画的时候控制端的都不要悬空，这是最保险的。题目出悬空只是为了让你知道对TTL来说悬空相当于高电平，实际接的时候你还是不要悬空。

除了三极管，还有用MOS管做的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031701922.png)

输入只取+VDD或0，输入+VDD的时候下面N沟道的VGS超过导通电压导通，而上面P沟道的VGS=0，不满足-VGS<VP，所以上面截止，这样vo就是连到下面是0，输出低电平。输入0的时候就P沟道的导通，N沟道的截止，输出高电平。MOS管做的逻辑门的静态功耗低。比TTL的好，这个更加理想。但是CMOS的动态功耗高，就是切换期间电流会瞬间增大。这会给VDD带来干扰，出现毛刺，所以需要加去耦电容

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031701679.png)

务必注意箭头方向和导通时电压方向相反而不是相同。

对a看看怎么分析，首先对于N沟道的，也就是箭头往左的，输入高电平就导通，而箭头往右的输入高电平就截止。那你看只有A和B都是高电平的时候，TN1和TN2导通，La才是接地得到0，其余的都会都得到1。其实你看他们的逻辑就知道了，串联的N沟道就是表达了两个都是1才能到0，而并联的P沟道就是表达只要有一个是0就会弄到1。对b也是类似的，就是改了变成两个都是0才能让两个P沟道的导通得到1

还有一个叫做传输门，能够控制能不能传，这个不是单纯缓冲器+高阻态。你最好把它当作模拟开关，因为它不具备像缓冲器那样如果输入是1（比如3.5V）就保证输出是5V（假设缓冲器接的是5V）的功能，它只是让VI=VO。另外它需要一对相反的信号来控制，不能像EN那样只用一个来控制。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031701389.png)

控制开关的是C和-C，如果C是1，-C是0，那vi=vo，不用具体去分析了，直接会用就行。然后如果C是0，-C是1，那输入输出就断开

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031702127.png)

这个双刀双掷开关分析起来也还好，当C=1，A1和A3接的导通了，A2和A4接的截止了，当C=0就是A2和A4的导通。

### 其他

偶尔你会看到接高电平的时候不是纯粹接高电平而是还接了一个电阻，从逻辑上来说这和直接接高电平没有区别，对TTL还是CMOS都是如此

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031702973.png)

比如这里+5V接了一个电阻，这个电阻可以直接无视。如果硬要说它的作用，就说是限流电阻。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031702126.png)

如果你只有一个输入，那对于多出来的那个要进行相应的处理，不要把它悬空，悬空是高阻会引入干扰

对于多余输入端，对于与非门电路，如果用不上那就接高电平，在实验中不要接VCC，因为VCC是供电的，为了避免不必要的干扰。对于或非门电路，把多余的输入端接地，如果要带电阻接地，对于TTL来说电阻阻值小于500Ω。不要把多余输入端悬空，对于TTL电路，虽然悬空相当于高电平，但是会引入干扰，对于CMOS不要悬空，虽然理论上来说悬空就没有电位，截止，但是容易积累电荷，输出不好说。对于CMOS来说，带电阻接地，无论电阻是多大，都是低电平

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031703080.png)

对于不同类型的逻辑门连接，需要满足这样的关系，本质上还是那个静态原则的应用。

由于TTL的VOHmin和CMOS的VIHmin不满足要求，因此应该这样改一下电路

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031703831.png)

中间那个CMOS是用来把TTL的输出电平给转换到符合要求的

如果是CMOS驱动，TTL做负载，CMOS的灌电流太小，需要放大，应该像下面这么接

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031703861.png)

### 题目

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031704218.png)

这种题要你写输出的逻辑表达式，别忽略了使能的控制，要分C和-C讨论，而且C总是最外面的。另外高阻态输入对于TTL来说等于高电平

于是F1=$\overline{AB}\bar C+\bar B C$。其实应该用C讨论，当C是低电平也就是左边那个三态使能之后，对A和B做一个与非操作，注意这个非不要弄到-C头上，-C是单独的。而C是高电平的时候左边那个三态门始终输于高阻态，对于右边TTL与非门来说相当于输入高电平，那么就只是给B加一个非了，注意也不要给C上加

F2=$(A\oplus B)\bar C+\bar B C$，可以自己检验一下

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031704344.png)

这个题关键在于看懂这张图

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031657952.png)

最重要的是搞明白不同接法时那个三极管的状态时是饱和导通还是倒置。基极电位总是被“电压最低”的那个发射结钳位。电压表相当于大电阻，当B接的电压大于1.4V时，B那个发射结截止，集电结通，进入倒置状态，此时基极电压就是2.1V。而A发射结经过大电阻（电压表）接地，是导通的（但电流小，不影响整体状态还是倒置），有0.7V压降，所以电压表上是1.4V。当B接的电压小于0.7V，A和B的发射结都正向导通，基极电压经过0.7V压降到达A和B，所以A和B上电压相等。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031705339.png)

本题符号有误，左边那个是三态门，应该是一个倒三角，而不是OC门。

这题有必要解释一下。对于TTL来说，接大电阻到地等效于高电平。所以这里如果是TTL，那么当C是低电平，也就是不使能，那三态门就相当于高阻态，此时与非门接了一个1（大电阻到地）和A做与非。当C是高电平使能，那就对B取非做输出，输出是1就是1，是0就是0，所以可以正常写出结果。

对于CMOS，大电阻到地不能提供高电平，就视为0了，所以当C为低电平，不使能之后，那与非门有一个是0之后输出就只能是1。当C为高电平，使能，B来控制三态门输出，那结果和之前TTL一样，主要考察输入端经过大电阻到地怎么理解。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031705273.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031705283.png)

TG可以当作模拟开关。

注意如果是缓冲器，就是下面画的那个1的，它看的是供电的5V，而不是输入的数值模拟输出

## 组合逻辑电路

逻辑门组装成逻辑电路，逻辑电路可以分为组合逻辑电路和时序逻辑电路

组合逻辑电路是输出由此时的输入决定的电路，不具备记忆能力

分析组合逻辑电路可以写出其逻辑表达式或真值表然后看什么情况下才输出1。真值表可以反推逻辑表达式，你把真值表中所有输出为1的对应的基本事件全部求和就是逻辑表达式

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031706570.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031706752.png)

你就在每个输入输出那里标出来表达式是什么，这样比一个个代入更方便

如果要根据要求自己设计逻辑电路，就要先根据要求得出真值表，得到逻辑表达式并化简，然后用相应的器件构造出电路，化简逻辑表示是为了让构造的时候用的元件少一些

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031707204.png)

8421BCD表示了0到9的数字，而从10到15也就是1010，1011，1100，1101，1110，1111是BCD伪码，那这些伪码就在卡诺图上标出来是1，然后画圈来化简。化简之后，要转换为或非逻辑，用了德摩根定律把它给换过来。如果圈0你一开始会得到$\overline Y=\overline{\overline {A_3}+\overline{A_2}\ \overline{A_1}}$，你需要自己对A2A1那个再加两个反然后化成题目上的那样

注意或非门改造一下就变成了非门，就是A3那里自己接两个

### 竞争-冒险

多线传输的时候，信号可能不能同时到达，会产生误判的情况

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031707403.png)

A从1到0，B从0到1，Y本应该一直保持0，但是可能会因为错位导致有一段输出1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031707076.png)

这个也是类似的

这种信号一个从1到0，另一个从0到1的情况称为竞争，由竞争导致的产生尖峰脉冲的情况叫做冒险，合称竞争-冒险

会考你根据逻辑函数表达式判断有没有可能发生竞争-冒险，方法就是看给一些变量赋值之后，能不能化成$A+\bar A或A\bar A$的形式，注意不能把A+非A合并成1，也不能把A 非A合并为0

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031707770.png)

如果想要消除竞争-冒险可以用几种方法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031708558.png)

引入选通脉冲，那就确保信号变化前后都是0。如果引入滤波电容那就避免了Y电压的跳变，不过会导致Y电平变化比较慢

再或者就修改逻辑表达式，让它不会出现那种情况

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031708859.png)

### 编码器

编码器分为基本编码器和优先编码器。基本编码器一次只能有一个输入

看一下编码器的设计过程，本质上还是让特定的输入给出特定的输出

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031708527.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031709385.png)

化简的话这个用卡诺图更加直观，不用这么麻烦。然后呢我解释一下这个电路，你根据真值表的输入知道，只需要考虑每次只有一个输入的情况，所以这里就用S来调来决定输入的那一个是哪个，然后S碰到的那根线就是高电平，没碰到的就是低电平，然后就这么接两个或门就行

常用的基本编码器有二进制编码器和二-十进制编码器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031709458.png)

这个应该是根据输入的是哪一个(0到2的n次方-1中选一个)来确定对应的二进制输出

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031709803.png)

这个应该是根据输入的是哪一个数码来确定BCD值应该怎么输出

优先编码器允许有多个输入，但是有优先级的区别。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031709823.png)

全部都当成了反码。1和0是实际的输入，而-W是指把这个输入解读为相反的。所以当你把它反过来，比如第一行，就变成了只有第零位是1，那么对应的BCD码输出应当解读为0000

这样做的话，需要看出现0的最大的输入是哪一位，后面的就无所谓了。优先编码器输出函数的设计以及电路太复杂了，我不放上来

介绍集成编码器

CD4532

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031711986.png)

EI=0时编码器不工作，EI=1时工作，如果没有输入则EO为1，GS=0，如果有输入则EO=0，GS=1。

EO可以用来做多个芯片的扩展，比如说我需要16个输入的时候，前一个的EO就可以接下一个的EI，这样如果前八个都没有输入，那就可以看后八个有没有了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031711111.png)

可能会给你简化逻辑图问你几个引脚，要记得至少要加上电源和地，像这里逻辑图上14引脚但是是16引脚的

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031711215.png)

这个或门方向有点误导，是往下输出的，平时看习惯了大于等于的方向是输出在这里可能一下没看明白。

当EO1=1时第二个板才能工作，也就是A8到A15无输入时第二块板可以工作。然后低三位其实是一样的，就看在1板还是0板作为高位。因为你看1板其实就是1000到1111，0板就是0000到0111，所以Y2，Y1，Y0直接接或门输出到L2，L1，L0。然后L3的话就看如果是1板输出那就是1，所以直接接1板的GS了

### 译码器

译码器分为二进制译码器和二-十进制译码器

先看二进制译码器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031712464.png)

开启的EN用了相反的，在EN=0的时候输出反过来都是0。在EN=1的时候，也就是开启的时候，A1和A0的一个状态是对应一个为真的。这里是因为输出都用了相反的来表达，所以应该反过来看，A1=A0=0的时候，其实只有Y0是1，然后A1=1，A0=0的时候只有Y1是1，以此类推。为什么要这么麻烦，我猜是因为如果正着来的话，用已有的门来构造的话逻辑表达式比较复杂，所以用了这样的方法

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031712260.png)

再看二-十进制译码器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031712896.png)

其实也就是那个LED显示数字的要用到

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031712519.png)

里面其实也就是8个发光LED

介绍集成译码器

74HC138

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031713431.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031713801.png)

只有G1高，G2A和G2B低的情况下才工作。然后选择的CBA其实也就是二进制的三位，输出就看L的那个就行了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031713153.png)

当A3=0，只有I是开的，当A3=1，I被关掉了，II开了，这里A3同时控制G1和G2A，G2B挺巧妙的

译码器实际上实现了从输入到最小项的转换，如果你把需要用到的最小项用或门连接，那就可以实现逻辑函数了，因为逻辑函数你化简之后就是与或表达式。

不过对于译码器一般不是后面接或门而是接与非门，因为它输出的是非，比如你想要输出Y1+Y3，但是它提供的是-Y1, -Y3，那你可以通过$\overline{\overline{Y_1}}+\overline{\overline{Y_3}}=\overline{\overline{Y_1}\cdot\overline{Y_3}}$来表达，所以是要接与非门

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031713878.png)

其实这个转换很经典，可以直接记G2=C，G1=C异或B，G0=B异或A。但这里用不着，因为这里要用译码器，而译码器已经提供了所有基本事件。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031714006.png)

这里不需要把真值表变成卡诺图再化简，这里直接把对应的最小项后面接一个与非门就行

再来一个特别的真值表

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031714702.png)

这种完全没法化简，这种用异或实现起来比较方便，适合用异或门来实现的真值表会有很明显的“网格”，“棋盘”特征。这个时候怎么办，其实你不用格雷码来排而是用二进制来排就好了，因为二进制00，01，10，11天然就是把相同的和不同的给拆开了。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031715334.png)

这下豁然开朗，可以写成(A3异或A2)(A1同或A0)+(A3同或A2)(A1异或A0)，其实可以进一步写为A3异或A2异或A1异或A0，括号加一下就行，本来就是实现检验奇偶的功能。凡是出现对称的就想到异或

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031715859.png)

注意这里化简的方法，比如-A2-A1A0，你就看成001，那就等于Y1，那取两个反不变，然后再用一个德摩根定理，对其他的在化简的时候都可以这么搞

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031715293.png)

### 数据选择器和数据分配器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031716836.png)

MUX就是数据选择器。当-EN=0，也就是EN=1时可以工作。用两位的地址A1和A0来控制四个输入哪个接到输出。比如说A1=0, A0=0的话我就让Z=D0，其他的断开，A1=0, A0=1的话就让Z=D1，就这样的一个东西

这输入是地址，输出是按最小项输出，和译码器差不多。

74HC153

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031716004.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031716403.png)

其实很简单就是用地址的两位来选根据哪一个数据输出，输出和被选中的那个电平相同

注意两个输出的地址是共用的，如果你两个G都enable，那比如BA是00，那Y的输出，1Y就是1C0，2Y就是2C0。如果你不希望它们同时工作，那就像下面这样接，就可以扩展成八选一了

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031716850.png)

改装成8个通道里选一个，就需要多一个C作为输入，三位01的才能表示8个位置。当C=0，相当于1G=1，2G=0，就看上面那四个，Y接了一个或门，注意当G=0的时候输出是0，也就不用管了。如果C=1，就2G=1，1G=0，看下面那四个。然后接了一个或门输出，因为如果disable的话Y输出是L

74HC151

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031717147.png)

讲一下符号的问题，可以看到怎么这里两个都是Y，是因为如果标在框里面统一不加横杠，通过有没有圆圈来判断。如果写在外面就需要写非

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031717970.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031718114.png)

要控制16路那就要增加一个选地址的，就多用了一个S3，当S3=0，下面那个相当于被ban了，只需要看上面的，当S3=1相当于上面的被ban了只看下面的。这里的与门就是用来把上面或下面的ban掉

如果用4选一的来构建十六选一，可以用五片四选一。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031718056.png)

自己填数验证一下

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031718292.png)

这个其实是简单的，因为数据选择器本身就是一一对应的关系，你只要让相应输入的时候输出为1就行

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031719449.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031719244.png)

这和译码器其实设计思路一样，就是都已经给了你最小项

但是如果只给了你四选一的，但是要实现的函数是含ABC的，这个时候你的输入就不要用1或者0了，而是用C和$\bar C$，可以实现更多的效果。比如$AB+\bar B \bar A$，本质上是在AB组成的最小项乘了1或者0。如果乘的是C和-C，那就可以实现像是$ABC+\bar B \bar A\bar C$的效果，只要把原来接1的改成00的接-C，11的接C，下面这道题就体现了这种思路。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031719654.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031719843.png)

用数据选择器还可以实现输出设定好的序列

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031719476.png)

就是地址就一个一个加就行那就能从I0依次输出到I7

数据分配器就是把一路输入根据设定的地址输出到对应的出口，可以用译码器实现

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031720378.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031720016.png)

把EN当作输入就行，连电路都没有改

这个其实也提供了最小项，你就让输入为1，然后把最小项用或门（如果输出的和输入的相同）或者与非门（如果输出是反的）接就行。

### 加法器

加法器这块很重要，熟悉一下半加器全加器的化简结果

其实无论是半加器还是全加器，三个输入A, B, C的地位是一样的，它看的是A, B, C中1的个数。那个S位看的是数量是奇数，进位位看的是数量大于等于2

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031720972.png)

半加器处理两个一位二进制数的相加，Ci=1表示有进位

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031721334.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031721169.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031721569.png)

全加器可以处理低位的进位

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031721440.png)

如果想要实现多位的，就把这一位的C接到下一位的进位那里去

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031721386.png)

注意最低的0那个位，如果是用全加器，需要把Ci-1接到0。如果用半加器就不用额外处理了

这种串行进位的加法器有一个问题就是高位的得等低位算完才行，速度慢，为了提高速度另外设计了超前进位加法器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031722807.png)

超前进位加法器额外设计了一个电路直接由各级的输入和C0来得到各个C，区别在于串行进位的逻辑是我得到了Ci-1之后才能得到Ci，但是超前进位是不管Ci-1了，直接用C0和各个AB得到Ci，因此会更快，不过也会更加复杂，表达式在图中有，其中Gi=AiBi，Pi=Ai+Bi

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031722021.png)

根据递推公式可以得到各项的最后的表达式，比如C2就是写出G2+P2C1之后直接把之前的C1表达式带进去就行。不过超前进位这个无论在作业还是考试都没遇到

补充半减器和全减器

半减器真值表

| A | B | D（差） | B_out（借位） |
|---|---|--------|-------------|
| 0 | 0 | 0      | 0           |
| 0 | 1 | 1      | 1           |
| 1 | 0 | 1      | 0           |
| 1 | 1 | 0      | 0           |

逻辑函数： 

$D = A \oplus B$  

$B_{out} = \overline{A} \cdot B$

全减器真值表

| A | B | C_in | D（差） | C_out（借位） |
|---|---|------|--------|-------------|
| 0 | 0 | 0    | 0      | 0           |
| 0 | 0 | 1    | 1      | 1           |
| 0 | 1 | 0    | 1      | 1           |
| 0 | 1 | 1    | 0      | 1           |
| 1 | 0 | 0    | 1      | 0           |
| 1 | 0 | 1    | 0      | 0           |
| 1 | 1 | 0    | 0      | 0           |
| 1 | 1 | 1    | 1      | 1           |

逻辑函数：  

$D = A \oplus B \oplus C_{in}$  

$C_{out} = \overline{A} \cdot B + \overline{A} \cdot C_{in} + B \cdot C_{in}$

74HC283

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031828275.png)

本质上就是实现1111(A3A2A1A0)+1111(B3B2B1B0)+0/1(CIN)，如果最后有进位就COUT=1

两个的话就直接连

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031828061.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031828445.png)

这里在做无符号数A和B的A-B运算。注意，这里已经默认在做减法运算，因此不需要像之前有符号数那样多一位来表示是+还是-，这里所有位都用来表示数值，也就是A3A2A1A0表示0到15的数，B也是如此

我第一次看的时候，困惑为什么是全部取反+1，一开始我以为是有符号数的补码，很困惑B3为什么要取反，现在才知道因为是已经知道了是做减法，所以你直接取反+1即可，第五位符号位直接不需要了

I板实际上在做的事情就是求A+$\bar B$+1，其中$\bar B$=15-B（因为按位取反加起来就是1111），所以得到的就是16+A-B。如果16+A-B≥16，那么C_OUT=1，也就是A≥B，这时你就知道，A-B是一个正数，S3S2S1S0就是一个正数的补码也是它的原码，那么其实就已经可以直接输出了，所以这里接了四个异或门(=1)。如果C_OUT=1，那么反一下就是0，对于S3, S2, S1, S0，如果是1那输出就是1，如果是0输出还是0，相当于原样输出，经过II板，因为II板A输入都是0，所以相当于+0直接输出了。但是如果C_OUT=0也就是A<B，那你就不能直接输出了，现在得到的S3S2S1S0是一个负数的补码，你要把它转为原码。那此时C_OUT=0，反一下得到1，那S3, S2, S1, S0经过异或门相当于完成了取反，然后II板的C_IN=1，那就是+1，结合了取反也就是得到了补码。补码的补码等于原码，所以最终II输出的S3S2S1S0就是原码了。

注意这里最终输出的S3S2S1S0仍然不包含符号位，实际上这个运算电路得到的是|A-B|，你自己试一下被减数A=0000，减数B=1111，最终算出来就是1111。

在这里异或用于取反，其实从微机那里就可以学到与可以用来删除(0)和保留(1)，或可以用来置1(1)和保留(0)，异或可以用来取反(1)和保留(0)

加法器还可以用来转换代码

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031829699.png)

利用加法器来做转换，那就要利用它加法的特性，看看要加多少才能变成想要的，此时输入和输出你都只是看成2进制数，忽略它内部的某些权重的意义。

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031829299.png)

注意这里把超出1001的情况都视为无关项，可以化简目标。这里用了圈0的方法然后用或非来做了

### 数值比较器

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031829452.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031829795.png)

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031829782.png)

高位优先，全相等的时候l的输入直接用于输出

74HC85

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031830741.png)

如果没有低位输入就接la=b高电平，la>b和la<b接地

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031830333.png)

不是，课本这里怎么画成这样，为什么那里又是1又是0，何意味啊。我觉得画错了，不应该打那个点，只有la=b接1，其他的两个接0

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031830618.png)

### 奇偶校验器

已经有一个二进制数，现在多出一位，保证二进制数里的1的个数和这一位上1的个数之和为一个奇数（奇校验）或偶数（偶校验）

比如我想要偶校验，现在有一个二进制数11110000，那么多出来的这一位我就让它为0，如果有一个二进制数11100000，那我就让多的这一位是1

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031831553.png)

OD是odd，E是even

偶校验就反过来，是奇数的话奇校验位YOD=1，偶校验位YE=0...

奇偶校验器可以用于检测信号传输是否有错误

74HC1180

![image.png](https://skyeyesandox-1374084537.cos.ap-shanghai.myqcloud.com/202607031831695.png)

I板在奇校验模式，它的YOD输出作为控制II板属性的信号。如果YOD=1，也就是原信号中有偶数个1，那么II板处于奇校验模式，如果信号正确传输，那么得到的YOD还是1，接收器打开让信号通过。如果信号有了改变，那么YOD=0，信号不通过。如果YOD=0，有奇数个1，那么II就是偶校验模式，如果正确传输，YOD也是1，如果不正确YOD=0

### 组合逻辑电路设计思路

如果只是给你基础门电路，从头开始让你设计，其实反而是简单的，只需要根据输入和输出列真值表，画卡诺图，然后化简成最简与或之后再改成需要的形式，比如与非之类的然后拼就行了。但是在引入了集成单元之后，有些功能它已经可以提供，要求你借助一些集成的器件来实现这真值表，这就没那么容易了，因为你需要结合器件本身的功能来设计。

最通用的流程是根据要求确定真值表，如果给你的元件比较基础，那你要画真值表。如果给你的元件已经具备一定的逻辑功能，比如译码器、数据选择器和数据分配器或者加法器，那就结合它的功能来用。

比如说使用加法器来实现真值表，需要把输入和输出都看成2进制数，而不是它原本代表的含义，然后相减，看每种情况应该给加数赋值多少。

如果是使用译码器来实现真值表，可以把译码器输出当作最小项，接与非门来实现

如果用数据选择器来实现，由于数字选择器其实也已经提供了最小项，所以你把希望对应1的最小项的输入接1，其余接0即可，然后ABCD接地址线

从二进制ABC到格雷码WXY，W=A，X=A异或B，Y=B异或C

我觉得熟悉常见真值表比较重要，还有就是连接了。

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

ROM，RAM不考

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

