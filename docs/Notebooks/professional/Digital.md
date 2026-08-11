# 数字电路上半

## 写在前面

这篇笔记基于《集成电子技术基础教程 第四版 下册》以及张德华老师2026春夏学期《数字电路分析与设计》（2.5分）整理而来。里面关于考试范围的表述（如XX不考）仅供参考，以老师实际公布的考试范围为准。

与其他笔记类似，这则数电笔记是我通读教材之后，保留关键信息，建立逻辑联系而形成的，包含我学习过程中的见解，希望能帮到初学者以及复习的人。可以说看过我这篇笔记之后，教材中的大部分内容都是不用看的。

分成上半部分和下半部分，上半部分就是数字逻辑，集成逻辑门电路以及组合逻辑电路，这些是比较基础的，不怎么涉及时序的东西。下半部分就是从触发器开始到组合逻辑电路以及后面555集成定时器等。

二次整理过后如果打算分发（如发布在CC98等），请先告知[CC98@skyeye2024](https://www.cc98.org/user/id/761094)，谢谢。该笔记目前只发布在个人网站，严禁未经允许用于任何盈利用途。

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