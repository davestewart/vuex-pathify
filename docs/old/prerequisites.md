<style>
h4 {
    margin-left: -.5em;
    -border-bottom: 1px solid #EEE;
    -padding-bottom: 0.4em;
    display: list-item;
    list-style-type: decimal;
    color: #CCC !important;
    font-weight: 400 !important;
}

h4 span {
    padding-left: .5em;
}

.markdown-section li {
    padding-top: 1px;
    color: #25afaf;
    font-weight: 700;
}

.markdown-section li p {
    color: #34495e;
    padding-left: 0.5em;
    font-weight: 400;
    opacity: 0.8;
}

.markdown-section li p:first-child {
    font-family: Merriweather;
    font-weight: 400;
    font-size: 1.3em;
    font-style: italic;
    margin-bottom: -5px;
    color: #222;
    font-weight: 400;
}


.markdown-section ol {
    padding-bottom: 20px;
}

</style>

# Read me first...

> What you should know before introducing Pathify to a project

Pathify is designed to make your Vue projects leaner and cleaner, but there are a few things you should know before making the commitment to rip out the old and install the new.

1. Pathify abstracts the Vuex API to primarily get, set and state

    This simplifies decision making processes and removes significant boilerplate. 
    
    You get, set or sync paths... and that's it.
    
2. Pathify maps paths to **Vuex** store members
    
    When you give Pathify a **path**, it determines the associated state property, then returns a **value** or calls a **handler**.
    
    Pathify **does not replace Vuex**, it exists as an **interface** to it. 

3. Pathify determines store members programmatically

    In order to resolve 1-dimensional paths to 4-dimensional store members, Pathify uses an algorithm. The algorithm is configurable, but specific to your store's naming scheme.
    
    As such, if you commit to using Pathify, store members need to be named **predictably**.
    
4. Pathify will replace big chunks of code

    Pathify's helper functions have been written specifically **to replace hand-rolled code** for many everyday store boilerplate and component wiring scenarios.
    
    This is a good thing; you just need to be comfortable to **give up control** to a 3rd-party solution.
    
5. Pathify and Vuex, sitting in a tree...

    Pathify's mapping algorithm is tuned for **get** / **set** operations, so commits that use alternate nomenclature such as **increment** or **update** cannot be handled by Pathify.
    
    In these cases it's simple and expected **to just use Vuex directly**. Commits and dispatches use path syntax anyway, so it doesn't feel out of place.
    
If this all looks good and you're happy to continue, click to continue to [Installation and setup](/guide/setup.md).