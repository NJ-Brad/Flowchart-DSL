```mermaid
flowchart TB
    a0["Start"]
    d0{"What kind of feedback was received?"}
    d00{"Is it clear and informative?<br/>(More than just a link or 'Fix this')"}
    a1["Communicate with commenter: <br/>'I’m not sure what you meant.<br/>Could you elaborate?'"]
    d2{"Is it reasonable?"}
    d3{"Can it reasonably be<br/>implemented in the current story?"}
    a2["Do it"]
    a3["Create a new story to<br/>address the new / discovered<br/>tech debt."]
    d4{"Does it differ from<br/>the stakeholder’s request?"}
    a4["Communicate with commenter:<br/> Thank you for your input.<br/>We will address this in a future sprint."]
    a5["Communicate with commenter:<br/> 'Thank you for your input.<br/>  This deviates from the work that was requested.<br/>  After we discuss this with the requester<br/> we will determine if further work is required'"]
    d5{"Does it differ from<br/>the stakeholder’s request?"}
    a6["Communicate with commenter:<br/> Thank you for your input.<br/>  We will consider this for future work."]
    a7["Communicate with commenter:<br/> Thank you for your input.<br/>  This deviates from the work that was requested.<br/>  We will pass your feedback along, to the requester"]
    dr1{"Is it clear and informative?<br/> (More than just a link or Fix this)"}
    ar1["Communicate with commenter:<br/>“I’m not sure what you meant.<br/> Could you elaborate?”"]
    dr2{"Is it reasonable?"}
    dr3{"Can it be reasonably<br/>implemented in the current story?"}
    ar2["Do it"]
    dr4{"Does it differ from<br/>the stakeholder’s request?"}
    ar3["Conduct an internal discussion<br/>to arrive at a resolution<br/>(new story or approval)"]
    ar4["Conduct a discussion, including<br/>the stakeholder and<br/>the commenter to arrive at a resolution<br/>(new story or approval)"]
    dr5{"Does it differ from<br/>the stakeholder’s request?"}
    ar5["Conduct an internal discussion<br/>to arrive at a resolution (additional<br/>work for story or approval)"]
    ar6["Conduct a discussion, including<br/>the stakeholder and the<br/>commenter to arrive at a resolution<br/> (additional work for story or approval)"]
    a0--" "-->d0
    d0--"Comment"-->d00
    d0--"Rejected"-->dr1
    d00--"No"-->a1
    d00--"Yes"-->d2
    d2--"Yes"-->d3
    d3--"Yes"-->a2
    d3--"No"-->a3
    a3--" "-->d4
    d4--"No"-->a4
    d4--"Yes"-->a5
    d2--"No"-->d5
    d5--"No"-->a6
    d5--"Yes"-->a7
    dr1--"No"-->ar1
    dr1--"Yes"-->dr2
    dr2--"Yes"-->dr3
    dr3--"Yes"-->ar2
    dr3--"No"-->dr4
    dr4--"No"-->ar3
    dr4--"Yes"-->ar4
    dr2--"No"-->dr5
    dr5--"No"-->ar5
    dr5--"Yes"-->ar6

```