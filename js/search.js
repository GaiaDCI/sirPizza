<script>

    let search = () => {
        let searchBar = document.getElementById("searchBar");
    document.location.href = `/pizzas/search?query=${searchBar.value}`;
};
</script>