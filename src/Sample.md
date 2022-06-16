``` mermaid 
flowchart TB
    a1(Start)
    d1{What day of<br/>the week is it?}
    a2[Take out the trash]
    a3[Take out the recycling]
    a4[Relax]
    d2{Is this the<br/>alternate week?}
    a1--" "-->d1
    d1--"Sunday"-->a2
    d1--"Tuesday"-->d2
    d2--"Yes"-->a3
    d2--"No"-->a4
    d1--"Wednesday"-->a2
    d1--"Other"-->a4

```