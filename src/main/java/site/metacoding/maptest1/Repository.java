package site.metacoding.maptest1;

import org.springframework.data.jpa.repository.JpaRepository;

import site.metacoding.maptest1.dto.Item;

public interface Repository extends JpaRepository<Item, Integer> {

}
