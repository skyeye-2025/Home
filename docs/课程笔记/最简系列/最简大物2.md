# 最简大物2

!!! warning
    一开始看到的“乱码”是latex代码，稍等一下，网页渲染需要一些时间

!!! info
    在ydd老师的改革下，大物的考察范围更广更浅，因此尽可能多地了解课本上涉及到的公式就尤为重要。我整理了大物中和大物下也就是电磁学、量子力学和光学相关的公式，供大家考前快速过一遍。

## Part1

$$
\begin{align}
库仑定律F&=\dfrac 1 {4\pi\varepsilon_0}\dfrac {q_1q_2} {r^2}\\
真空点电荷场强E&=\dfrac 1 {4\pi\varepsilon_0}\dfrac {q} {r^2}\\
高斯公式\unicode{8751}\vec E\cdot d\vec S&=\frac 1 {\varepsilon_0}\iiint dq\\
环路定理\oint \vec E\cdot d\vec l&=0\\
电偶极矩\vec p&=q\vec l(方向由负到正)\\
电势能W_P&=\int\limits_P^\infty q\vec E\cdot d\vec l\\
电势U_P&=\int\limits_P^\infty \vec E\cdot d\vec l=\frac 1 {4\pi \varepsilon_0}\frac q {r}\\
电压(电势差)U_{ab}&=U_a-U_b\\
功A_{ab}&=qU_{ab}\\
\vec E&=-\nabla U=-\frac {dU} {dn}\vec {e_n}\\
孤立静电平衡导体表面场强E&=\frac \sigma {\varepsilon_0}\\
无穷大带电平面场强E&=\frac \sigma {2\varepsilon_0}\\
带电圆线圈轴线z处场强E&=\frac 1 {4\pi\epsilon_0}\frac {zq} {(z^2+R^2)^\frac 3 2}\\
\end{align}
$$

## Part2

$$
\begin{align}
孤立导体电容C&=\frac Q U\\
孤立导体球的电容C&=4\pi \varepsilon_0 R\\
电容器的电容C&=\frac Q {U_A-U_B}\\
真空平行板电容器的电容C&=\frac {\varepsilon_0S} d\\
真空圆柱形电容器的电容C&=\frac {2\pi \varepsilon_0 l} {\ln\dfrac {R_B} {R_A}}\\
真空球形电容器的电容C&=\frac {4\pi \varepsilon_0R_AR_B} {R_B-R_A}\\
电容串联\frac 1 {C_总}&=\sum\limits_{i=1}^n\frac 1 {C_i}\\
电容并联C_总&=\sum\limits_{i=1}^nC_i\\
极化强度\vec P&=\varepsilon_0\chi_c\vec E,经验公式, \chi_c是电极化率没有单位\\
极化强度\vec P&=\dfrac {\sum \vec {p_i}} {\Delta V},\sigma'=|\vec P|\cos\theta=\vec P\cdot \vec {e_n}, \vec{e_n}方向为介质表面外法线方向\\
E&=\frac {E_0} {1+\chi_c}=\frac {E_0} {\varepsilon_r}, 其中E是最终的场强，E_0是一开始外加电场的场强\\
电位移\vec D&=\varepsilon_0\vec E+\vec P=(1+\chi_c)\varepsilon_0\vec E=\varepsilon_r\varepsilon_0\vec E=\varepsilon \vec E\\
\varepsilon&=\varepsilon_r\varepsilon_0\\
电位移通量\unicode{8751}\vec D\cdot d\vec S&=\sum q_0\\
点电荷系统的相互作用能W&=\frac 1 2\sum\limits_{i=1}^nq_iU_i=\frac 1 2\int Udq=\frac 1 2\iiint U\rho dV(体电荷)=\frac 1 2\iint U\sigma dS(面电荷)\\
电容器的能量W&=\frac 1 2\frac {Q^2} C\\
电场的能量W&=\iiint\frac 1 2\varepsilon E^2dV, 电能密度(单位体积电场的能量)\omega_c=\frac 1 2\varepsilon E^2=\frac 1 2 DE\\
\end{align}
$$

## Part3

$$
\begin{align}
电流强度I&=\frac {dq}{dt}=\iint \vec j \cdot d\vec S=ne\Delta Sv_d(v_d是漂移速度)=q\nu=\frac {qv}{2\pi r}\\
电荷密度j&=\frac {dI} {dS}\\
\vec j&=-ne\vec {v_d}\\
电流连续性方程\unicode{8751}\vec j\cdot d\vec S &=-\frac {dq_内} {dt}\\
电流恒稳条件\unicode{8751}\vec j\cdot d\vec S &=0\\
I&=\frac U R\\
R&=\rho \frac l S\\
电导率\gamma&=\frac 1 \rho\\
\rho_T&=\rho_0(1+\alpha T)\\
欧姆定律微分形式\vec j&=\gamma \vec E\\
Q&=I^2Rt\\
P&=I^2R\\
焦耳定律微分形式\omega &=\frac {\Delta P}{\Delta V}=\gamma E^2(\omega 是热功率密度)\\
电动势\mathcal{E}&=\frac {A_k} q=\oint \vec {E_k}\cdot d\vec l\\
(电源内部)\vec j&=\gamma(\vec {E_0}+\vec {E_k})\\
U_{+}-U_-&=\mathcal{E}-Ir\\
含源电路欧姆定律U_B-U_A&=\sum \mathcal{E}-\sum IR\\
闭合电路的欧姆定律\sum \mathcal{E}-\sum IR&=0或I=\dfrac {\sum \mathcal{E}} {\sum R}\\
电容器充放电时间常数\tau&=RC\\
\end{align}
$$

## Part4

$$
\begin{align}
磁感应强度B&=\frac {F_m} {qv}\\
洛伦兹力\vec F&=q\vec v\times\vec B\\
毕奥-萨伐尔定律d\vec B&=\frac {\mu_0} {4\pi} \frac {Id\vec l\times\vec r} {r^3}\\
长直导线磁场B&=\frac {\mu_0I}{2\pi d}\\
长螺线管内磁场B&=\mu nI(对于非真空也适用), n是单位长度的匝数\\
螺绕环内磁场B&=\frac {\mu_0 NI} {2\pi r}, N是总匝数\\
载流圆线圈轴线x处磁场B&=\frac {\mu_0 N IR^2}{2(R^2+x^2)^{\frac 3 2}}\\
运动电荷的磁场\vec B&=\frac {\mu_0} {4\pi} \frac {q\vec v\times\vec r} {r^3}\\
高斯定理\unicode{8751}\vec B\cdot d\vec S&=0\\
真空静磁场安培环路定理\oint_L\vec B\cdot d\vec l&=\mu_0\sum I_内(路径所围平面内通过的电流)\\
安培公式d\vec F&=Id\vec l\times\vec B\\
磁矩\vec {p_m}&=NIS\vec{e_n}\\
磁力矩\vec M&=\vec {p_m}\times \vec B(恒稳磁场)\\
安培力做功A&=I\Delta\Phi=\int_{\Phi_1}^{\Phi_2}Id\Phi\\
霍尔电势差U_H&=R_H\frac {BI} d，其中霍尔系数R_H=\frac 1 {nq}\\
电子轨道磁矩\vec\mu &=IS\vec {e_n}=-\frac e {2m}\vec L, 其中\vec L是角动量\\
自旋磁矩\vec {\mu_s}&=-\frac e m\vec S(\vec S是自旋角动量)\\
磁化强度\vec M&=\frac {\sum \vec {p_m}} {\Delta V}=\chi_m\vec H\\
磁化电流线密度\vec {j_m}&=\vec M \times\vec n\\
|\vec M|&=j_m\\
\oint_L\vec M\cdot d\vec l&=\sum\limits_{L内}I_m(I_m是磁化电流)\\
磁场强度\vec H&=\frac {\vec B} {\mu_0}-\vec M\\
含磁介质安培环路定理\oint_L\vec H\cdot d\vec l&=\sum I_0\\
含磁介质高斯定理\unicode{8751}(\vec {B_0}+\vec{B'})d\vec S&=0\\
\vec B&=\mu_0(\vec H+\vec M)=\mu_0(1+\chi_m)\vec H=\mu_0\mu_r\vec H=\mu\vec H\\
\mu&=\mu_0\mu_r\\
\end{align}
$$

## Part5

$$
\begin{align}
磁通量\Phi&=\iint_S\vec B\cdot d\vec S\\
\mathcal{E}&=-\frac {d\Phi} {dt}\\
磁链\varPsi&=\sum\limits_{i=1}^{N}\Phi_i\\
q&=\int_{t_1}^{t_2}I_idt=-\frac N R\int_{\Phi_1}^{\Phi_2}d\Phi=\frac N R(\Phi_1-\Phi_2)\\
动生电动势\mathcal{E}&=\int_L(\vec v\times\vec B)\cdot d\vec l(\vec v是线元的速度)\\
感生电动势\mathcal{E}&=\oint_L\vec{E_i}\cdot d\vec l(\vec E_i是涡旋电场的场强)\\
&=-\frac {d\Psi}{dt}=-\frac d {dt}\iint_S\vec B\cdot d\vec S\\
&=-\iint_S\frac {\partial\vec B}{\partial t}\cdot d\vec S\\
自感系数(简称自感)L&=\frac \varPsi I\\
自感电动势\mathcal{E}_L&=-L\frac {dI}{dt}\\
弛豫时间\tau&=\frac L R\\
互感系数M&=\frac {\varPsi_{21}}{I_1}=\frac {\varPsi_{12}}{I_2}=k\sqrt{L_1L_2}\\
\mathcal{E}_{21}&=-M\frac {dI_1}{dt}\\
W_m&=\frac 1 2LI_0^2\\
磁能密度\omega_m&=\frac {W_m} V=\frac 1 2\vec B\cdot \vec H\\
W_m&=\iiint_V \omega_mdV\\
\end{align}
$$

## Part6

$$
\begin{align}
位移电流密度\vec {j_d}&=\frac {d\vec D}{dt}=\varepsilon_0\frac {\partial \vec E}{\partial t}+\frac {\partial \vec P}{\partial t}\\
\Phi_D&=\iint_S\vec D\cdot d\vec S\\
位移电流强度I_d&=\frac {d\Phi_D}{dt}=\iint_S\frac {\partial \vec D}{\partial t}\cdot d\vec S\\
全电流I_全&=\sum I+I_d\\
全电流安培环路定理\oint_L\vec H\cdot d\vec l&=\sum I+\iint_S\frac {\partial \vec D}{\partial t}\cdot d\vec S\\
麦克斯韦方程组积分形式:\unicode{8751}\vec D\cdot d\vec S&=\sum q\\
\oint_L\vec E\cdot d\vec l&=-\iint_S\frac {\partial \vec B}{\partial t}\cdot d\vec S\\
\unicode{8751}\vec B\cdot d\vec S&=0\\
\oint_L\vec H\cdot d\vec l&=\iint_S \vec j\cdot d\vec S+\iint_S\frac {\partial \vec D}{\partial t}\cdot d\vec S\\
麦克斯韦方程组微分形式:\nabla\cdot\vec D&=\rho\\
\nabla\times\vec E&=-\frac {\partial  \vec B}{\partial t}\\
\nabla\cdot \vec B&=0\\
\nabla\times\vec H&=\vec j+\frac {\partial \vec D} {\partial t}\\
真空光速c&=\frac 1 {\sqrt{\varepsilon_0\mu_0}}\\
介质中光速v&=\frac 1 {\sqrt{\varepsilon\mu}}=\frac c {\varepsilon_r\mu_r}\\
\frac E H&=\frac {E_0} {H_0}=\frac {\sqrt \mu} {\sqrt \varepsilon}(E_0, H_0是最大值)\\
最大值E_0&=\sqrt 2 E(有效值)\\
\frac E B&=\frac E {\mu H}=\frac 1 {\sqrt{\varepsilon \mu}}=v\\
电磁场总能量体密度\omega&=\frac 1 2 \varepsilon E^2+\frac 1 2 \mu H^2=\varepsilon E^2=\mu H^2\\
电磁波能流密度S&=\omega v=\frac v 2 (\varepsilon E^2+\mu H^2)=EH=v\varepsilon E^2=\frac 1 2v\varepsilon E^2_0\\
电磁波能流密度矢量\vec S&=\vec E\times\vec H\\
平面简谐电磁波平均能流密度\bar S&=\frac 1 2E_0H_0\\
通过某面A的功率P&=AS，S为能流密度\\
电磁场密度为\frac \omega {c^2}&，电磁场动量密度为\frac \omega c\\
偶极振子电矩p&=ql_0\cos\omega t\\
偶极振子平均辐射强度(能流密度)\bar S&=\frac {\mu p^2_0\omega^4\sin^2\theta}{32\pi^2r^2v}    \\
偶极振子平均辐射功率\bar P&=\frac {\mu p^2_0\omega^4} {12\pi v}\\
LC电磁振荡圆频率\omega&=\frac 1 {\sqrt{LC}}\\
LC电磁振荡总能量W&=\frac {Q^2_0} {2C}\\
LC受迫振动共振频率\nu&=\frac 1 {2\pi} \sqrt{\frac 1 {LC}}\\
\end{align}
$$

## 黑体辐射，光电效应，康普顿效应

$$
\begin{align}
单色辐出度M_\lambda(T)&=\frac {dM_\lambda}{d\lambda}, 单位时间，单位表面积，单位波长范围的辐射能\\
辐射出射度M(T)&=\int_0^\infty M_\lambda(T)d\lambda\\
单色吸收系数\alpha(\lambda, T)&=\frac {E_{吸收}}{E_{入射}},对于波长从\lambda到\lambda+d\lambda\\
单色反射系数r(\lambda, T)&=\frac {E_{反射}}{E_{入射}}\\
不透明物体:\alpha(\lambda, T)+r(\lambda, T)&=1\\
绝对黑体:\alpha_B(\lambda, T)&=1, r_B(\lambda, T)=0\\
基尔霍夫定律\frac {M_\lambda(T)}{\alpha(\lambda, T)}&=M_{B\lambda}(T)\\
黑体:斯忒藩-玻尔兹曼定律M_B(T)&=\int_0^\infty M_{B\lambda}(T)d\lambda=\sigma T^4, \sigma=5.67\times 10^{-8} \text{W}/\text{m}^2\cdot \text{K}^4\\
维恩位移定律T\lambda_m&=b, b=2.898\times10^{-3}\text{m}\cdot \text{K}\\
普朗克黑体辐射公式M_{B\lambda}(T)&=\frac {2\pi h c^2}{\lambda^5(e^{\frac {hc}{\lambda k T}}-1)}, h=6.63\times 10^{-34}\text{J}\cdot \text{s}\\
(能)量子数n&=\frac E {h\nu}\\
光电子最大初动能E_{km}&=e|U_a|\\
截止(红限)频率\nu_0&=\frac {U_0} k\\
光子能量E&=h\nu\\
光强I&=Nh\nu, N是单位时间单位通过单位面积的光子数\\
爱因斯坦光电效应方程式h\nu&=E_{km}+A=\frac 1 2 mv_m^2+A, A为逸出功\\
\nu_0&=\frac A h\\
eU_a&=\frac 1 2 mv_m^2\\
光子质量m&=\frac {h\nu} {c^2}\\
光子动量p&=\frac h \lambda\\
康普顿效应波长改变量\Delta \lambda&=\lambda-\lambda_0=\frac {h} {m_0c}(1-\cos \varphi), \frac h {m_0c}=0.0024\text{nm}\\
反冲电子动能E_k&=h\nu_0-h\nu=hc(\frac 1 {\lambda_0}-\frac 1 \lambda)
\end{align}
$$

## 德布罗意，不确定性，波函数，无限深势阱，势垒

$$
\begin{align}
&德布罗意关系式\lambda=\frac {h} {m_0v}=\frac h p(v<<c),注意\lambda\nu\ne v\\
&不确定性关系\Delta x\Delta p_x\ge\frac h {4\pi}=\frac {\hbar}{2}, \hbar=\frac h {2\pi}, 是约化普朗克常数\\
&\Delta E\Delta t\ge\frac h {4\pi}\\
&一维自由粒子的物质波波函数\Psi(x, t)=\Psi_0e^{-i2\pi (Et-px)/h}, |\Psi|^2是概率密度\\
&体积元内粒子出现的概率dW=|\Psi|^2dV\\
&归一化条件\iiint|\Psi|^2dV=1\\
&一维自由粒子波函数的微分方程i\hbar\frac {\partial} {\partial t}\Psi(x, t)=-\frac {\hbar^2}{2m}\frac {\partial^2\Psi(x, t)}{\partial x^2}\\
&一维有势场粒子波函数微分方程i\hbar\frac {\partial} {\partial t}\Psi(x, t)=[-\frac {\hbar^2}{2m}\frac {\partial^2}{\partial x^2}+E_p]\Psi(x, t)\\
&薛定谔方程(三维有势场)i\hbar\frac {\partial} {\partial t}\Psi(\vec r, t)=[-\frac {\hbar^2}{2m}(\frac {\partial^2}{\partial x^2}+\frac {\partial^2}{\partial y^2}+\frac {\partial^2}{\partial z^2})+E_p]\Psi(\vec r, t)\\
&定态波函数\Psi(x, t)=\psi(x)e^{-\dfrac i \hbar Et}, \psi(x)是振幅函数\\
&一维定态薛定谔方程\frac {d^2\psi(x)}{dx^2}+\frac {2m} {\hbar^2}(E-E_P)\psi(x)=0\\
&一般定态薛定谔方程(\frac {\partial^2}{\partial x^2}+\frac {\partial^2}{\partial y^2}+\frac {\partial^2}{\partial z^2}+\frac {2m}{\hbar^2}(E-E_P))\psi(\vec r)=0\\
&一维无限深势阱的定态波函数\psi_n(x)=\sqrt{\frac 2 a}\sin(\frac {n\pi} ax), n=1, 2, 3...\\
&一维无限深势阱的定态波的能量E_n=n^2\frac {h^2}{8ma^2}, n=1, 2, 3..., n称为量子数\\
&零点能(最小能量)E_1=\frac {h^2}{8ma^2}\\
&透射率T=e^{-2ka}, k=\sqrt{\frac {8\pi^2m(E_{p0}-E)}{h^2}}\\
&上式a为势垒宽度,m为粒子质量, E_{p0}为势垒高度，E为粒子能量\\
&线性谐振子的能量E_n=(n+\frac 1 2)h\nu\\
&线性谐振子的零点能E_0=\frac 1 2 h\nu\\
\end{align}
$$

## 氢原子

$$
\begin{align}
&氢原子光谱推广的巴尔末公式\frac 1 \lambda=\frac R {k^2}-\frac R {n^2}, n=k+1, k+2, k+3 ..., R为里约伯常数1.09\times10^7 \\
&极限(最短)波长\lambda_{min}=\frac {k^2}{R}\\
&波尔氢原子理论h\nu_{if}=E_i-E_f, L=n\frac h {2\pi}=n\hbar, n为量子数,n=1, 2, 3 ...\\
&波尔半径r_n=n^2\frac {\varepsilon_0 h^2}{\pi me^2}=n^20.529\times10^{-10}m, n=1, 2, 3 ...\\
&能级(量子化的能量值)E_n=-\frac 1 {n^2}(\frac {me^4}{8\varepsilon_0^2h^2}), n=1, 2, 3 ...\\
&基态能级E_1=-\frac {me^4}{8\varepsilon_0^2h^2}=-13.6eV, E_n=\frac {E_1} {n^2}, n=1, 2, 3 ...\\
&薛定谔方程得出第n个能级电子的轨道角动量L=\sqrt{(l(l+1))}\hbar, l=0, 1, 2 ,...,(n-1), l为角量子数\\
&薛定谔方程得出在给定l下角动量矢量在Z轴分量L_Z=m_l\hbar, m_l=0, \pm 1, ..., \pm l, m_l是磁量子数\\
&自旋角动量S=\sqrt{\frac 3 4}\hbar, S_z=m_s\hbar, m_s=\pm\frac 1 2\\
&主量子数为n的电子壳层中最多可容纳2n^2个电子\\
\end{align}
$$

## 干涉

$$
\begin{align}
\Delta\varphi&=\frac {2\pi} \lambda (r_2-r_1)=\frac {2\pi} \lambda d\sin\theta\\
振幅极大\Delta \varphi=\pm 2k\pi, 导出d\sin\theta&=\pm k\lambda, k=0, 1, 2, ...\\
振幅极小\Delta \varphi=\pm (2k-1)\pi, 导出d\sin\theta&=\pm (2k-1)\frac \lambda 2, k= 1, 2, ...\\
近似\sin\theta后明纹中心x&=\pm \frac D dk\lambda, k=0, 1,2, ...(对应0, 1, 2级明纹)\\
暗纹中心x&=\pm\frac D d(2k-1)\frac \lambda 2, k=1, 2, 3, ...(对应1, 2, 3级暗纹)\\
条纹间距(明纹之间或暗纹之间距离)\Delta x&=\frac D d \lambda\\
由S_1和S_2到达某处的光强I&=I_1+I_2+2\sqrt{I_1I_2}\cos(\varphi_2-\varphi_1)\\
双缝干涉中认为光强相等，则I&=4I_0\cos^2(\frac {\varphi_2-\varphi_1} 2)\\
对比度V&=\frac {I_{max}-I_{min}}{I_{max}+I_{min}}=\frac {2\sqrt {I_1I_2}}{I_1+I_2},在0到1之间\\
光程&=nr, n为折射率,r为几何路径长度\\
两束相干光通过不同介质后相遇, \Delta\varphi&=\frac {2\pi} \lambda(n_2r_2-n_1r_1)=\frac {2\pi} \lambda\delta, \delta为光程差\\
等倾干涉\delta=2e\sqrt{n_2^2-n_1^2\sin^2i}+\frac \lambda 2(i是入射角)&=
\begin{cases}
k\lambda, k=1, 2, 3, ... 明纹\\
(2k+1)\frac \lambda 2, k=0, 1, 2, ... 暗纹
\end{cases}
\\
劈尖干涉\delta=2ne+\frac \lambda 2&=
\begin{cases}
k\lambda, k=1, 2, 3, ... 明纹\\
(2k+1)\frac \lambda 2, k=0, 1, 2, ... 暗纹\\
\end{cases}
\\
劈尖干涉l\sin\theta&=\frac \lambda {2n}, l是干涉条纹间距, n是折射率\\
牛顿环e&=\frac {r^2} {2R}\\
牛顿环明环半径r&=\sqrt{(k-\frac 1 2)R\lambda}, k=1, 2, 3, ...\\
牛顿环暗环半径r&=\sqrt{kR\lambda}, k=1, 2, 3, ...\\
增透膜厚e&=\frac {(2k+1)\frac \lambda 2} {2n}, n为所镀物质的折射率
睾反射膜厚e&=(k-\frac 1 2)\frac \lambda {2n}\\
迈克耳孙干涉仪\Delta d&=N\frac \lambda 2\\
相干长度L_c&=\frac {\lambda^2}{\Delta \lambda}, \Delta \lambda 为谱线宽度\\
干涉条件\delta&<L_c\\
\end{align}
$$

## 衍射

$$
\begin{align}
&单缝衍射\\
&半波带法近似结果
\begin{cases}
\theta=0, 中央明纹中心\\
a\sin\theta=\pm k\lambda, k=1, 2, 3, ... 第k级暗纹中心\\
a\sin\theta=\pm(k+\frac 1 2) \lambda, k=1, 2, 3, ... 第k级明纹中心\\
\end{cases}\\
&(a为单缝宽度, \theta为光屏上点到透镜中心连线与水平的夹角)\\
&上式\sin\theta=\tan\theta=\frac x f, f是透镜焦距\\
&单缝衍射中央明纹半角宽度\Delta\theta_0=\frac \lambda a\\
&\frac I {I_0}=\frac {\sin^2 u}{u^2}, u=\frac {\pi a} {\lambda} \sin\theta\\
&积分得光强曲线结果
\begin{cases}
\theta=0, 中央明纹中心\\
a\sin\theta=\pm k\lambda, k=1, 2, 3, ... 第k级暗纹中心\\
\sin\theta_1=\pm 1.43\frac \lambda a, \sin\theta_2=\pm 2.46\frac \lambda a, \sin\theta_3=\pm 3.47\frac \lambda a
\end{cases}\\
&\frac {I_1}{I_0}=4.7\%, \frac {I_2}{I_0}=1.7\%, \frac {I_3}{I_0}=0.8\%\\
\\
&光栅干涉+衍射\\
&主极大干涉明纹条件\delta =d\sin\theta=\pm k\lambda, k=0, 1, 2, ...\\
&k=0中央明纹, k=1, 2等称为第k级主极大明纹, k<\frac d \lambda\\
&极小干涉暗纹条件Nd\sin\theta=\pm k'\lambda, N为光栅刻痕数(总缝数), k'=1, 2, ...\\
&相邻主极大之间存在N-1个极小, N-1个极小之间有N-2个次极大\\
&光栅分辨本领R=\frac \lambda {\Delta \lambda}=kN, N是总缝数, k是衍射级次, \lambda是波长, \Delta\lambda是最小波长差\\
\\
&圆孔衍射\\
&第一暗环对圆孔中心张角\theta_0=1.22\frac \lambda D, \lambda是入射光波长, D是圆孔直径\\\
&最小分辨角\theta_{min}=\theta_0=1.22\frac \lambda D\\
&望远镜分辨本领或分辨率R=\frac 1 {\theta_{min}}=\frac D {1.22\lambda}\\
\\
&X射线衍射\\
&布喇格公式, 干涉加强时\delta=2d\sin\theta=k\lambda\\
\end{align}
$$

## 偏振

$$
\begin{align}
&马吕斯定律I=I_0\cos^2\alpha, \alpha是偏振方向和偏振光光振动方向的夹角\\
&布儒斯特定律\tan i_0=\frac {n_2}{n_1}, i_0为起偏振角, n_2是折射后的介质折射率\\
&n_o=\frac c {v_o}, n_e=\frac c {v_e}\\
&波晶片光程差δ=|n_o-n_e|d, o和e相位差\frac \pi 2时\delta=\frac \lambda 4, 相位差\pi时\delta=\frac \lambda 2\\
&这样求出来的是波晶片的最小厚度,如果想增大可改成\frac \lambda 4+k\lambda或\frac \lambda 2+k\lambda\\
&偏振片偏振化方向垂直时o和e相位差\Delta \varphi=\frac {2\pi} \lambda |n_o-n_e|d+\pi\\
&相长时\Delta \varphi=2k\pi, 相消时\Delta \varphi=(2k+1)\pi, k=1, 2, 3, ...\\
&偏振片偏振化方向平行时o和e相位差\Delta \varphi=\frac {2\pi} \lambda |n_o-n_e|d\\
&相长时\Delta \varphi=2k\pi, 相消时\Delta \varphi=(2k+1)\pi, k=0, 1, 2, ...\\
&光弹性材料中|n_o-n_e|=kp, k是常数,p是应力\\
&克尔效应|n_o-n_e|=KE^2, K是常数, E是场强, \Delta \varphi=\frac {2\pi} \lambda |n_o-n_e|l=\frac {2\pi} \lambda KE^2l, l是极板长度\\
&旋光效应, 振动面转过角度\varphi=\alpha l, \alpha是旋光率, l是固体厚度,对溶液\varphi=\alpha cl, c是溶液浓度\\
&方解石|n_o-n_e|=0.172\\
\end{align}
$$

## 几何光学

$$
\begin{align}
&n_1\sin i=n_2\sin r\\
&全内反射\sin\theta_c=\frac {n_2}{n_1}, 发生在光密介质往光疏介质\\
&平面镜S=-S',虚像\\
&凹凸球面镜\frac 1 S+\frac 1 {S'}=\frac 1 f, f=\frac R 2\\
&横向放大率m=\frac {y'} y\\
&单球面折射\frac {n_1}{S}+\frac {n_2}{S'}=\frac {n_2-n_1} R\\
&薄透镜\frac 1 S+\frac 1 {S'}=\frac 1 f, m=-\frac {S'} S\\
&磨镜者公式\frac 1 f=(n-1)(\frac 1 {R_1}-\frac 1 {R_2})\\
&放大镜的角放大率m_\theta=\frac {25cm} f\\
&显微镜的放大率M=m\cdot m_\theta=(-\frac S {f_o})\frac {25cm} {f_e}, S=f_0+\Delta, \Delta 是显微镜管长, m是横向放大率, m_\theta是角放大率\\
&望远镜的角放大率m_\theta=-\frac {f_o}{f_e}\\
&以上出现的f_o指物镜焦距(object), f_e指目镜焦距(eye)\\
\end{align}
$$
