(function() { // protect the lemmings

    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    function PUT(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PUT', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    function DELETE(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // DELETE




    // const style2 = 'alt style2'
    // const altStyle1 = 'alt style1'
    const styles = ['style1', 'style2', 'style3'];
    // let currentStyle = styles[0];
    let currentStyle = 0;


    console.log(styles);

    function renderToSite(blogItems) {

        const container = document.querySelector('.js-blogPost');

        if (container !== null) {
            container.innerHTML = "";
            // console.log(container);

            console.log(currentStyle)

            for (const blogItem of blogItems) {
                const section = document.createElement('section');
                if (section !== null) {

                    section.innerHTML =
                        `<div class="inner">
    <a href="#" class="image"><img src="images/pic01.jpg" alt="" /></a>
      <div class="content">
        <h2 class="major">${blogItem.data.title}</h2>
        <p>${blogItem.data.blog}</p>
        <a href="#" class="special">Read more</a>
      </div>
  </div>`;



                    section.classList.add('wrapper', 'spotlight', styles[currentStyle]);
                    // for (i = 0; i < styles.length; i++) {
                    console.log(styles[currentStyle])
                    if (currentStyle === 2) {
                        console.log('here right now')
                        currentStyle = 0;
                        container.appendChild(section);
                        // return;
                    }

                    currentStyle += 1
                    container.appendChild(section);
                    // }
                }
            }
        }
    }










    // calling functions

    GET('/api/blogs')
        .then((blogItems) => {
            console.log(blogItems)
            renderToSite(blogItems)
        });






    //click events



    const creatBtn = document.querySelector('.js-postBtn')
    if (creatBtn !== null) {
        creatBtn.addEventListener('click', (e) => {


            const input = document.querySelector('.js-blogtitle')
            const body = document.querySelector('.js-blogPostArea')


            POST('/api/blogs', {
                title: input.value,
                blog: body.value,
                when: new Date().getTime() + 9 * 60 * 60 * 1000
            }).then((data) => {
                input.removeAttribute('disabled');
                body.removeAttribute('disabled');
                input.value = '';
                body.value = '';
                console.log(data)
                    // window.location.href = '/';
            })

        })
    }





























})();