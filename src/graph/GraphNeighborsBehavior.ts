export default interface GraphNeighborsBehavior<L, N> {
  get(location: L): N[];
}