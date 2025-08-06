use warp::Filter;

#[tokio::main]
async fn main() {
    let index = warp::path::end()
        .and(warp::fs::file("./templates/index.html"));

    let resume = warp::path("resume")
        .and(warp::fs::file("./templates/resume.html"));

    let contact = warp::path("contact")
        .and(warp::fs::file("./templates/contact.html"));

    let about = warp::path("about")
        .and(warp::fs::file("./templates/about.html"));

    let header = warp::path("header")
        .and(warp::fs::file("./templates/header.html"));

    let nav = warp::path("nav")
        .and(warp::fs::file("./templates/nav.html"));

    let links = warp::path("links")
        .and(warp::fs::file("./templates/links.html"));

    let static_ = warp::path("static")
        .and(warp::fs::dir("./static"));

    let routes = index
        .or(resume)
        .or(contact)
        .or(about)
        .or(header)
        .or(nav)
        .or(links)
        .or(static_);

    println!("Server running on http://0.0.0.0:3000");
    warp::serve(routes)
        .run(([0, 0, 0, 0], 3000))
        .await;
}
