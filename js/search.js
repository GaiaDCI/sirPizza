<script>

    let search = () => {
        let searchBar = document.getElementById("searchBar");
    console.log(searchBar.value);
    document.location.href = `http://localhost:3000/pizzas/search?query=${
        searchBar.value
    }`;
};
</script>