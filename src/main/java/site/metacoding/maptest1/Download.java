package site.metacoding.maptest1;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import site.metacoding.maptest1.dto.DownloadDto;
import site.metacoding.maptest1.dto.Item;
import site.metacoding.maptest1.dto.PonitDto;

@RequiredArgsConstructor
@RestController
public class Download {

    private final Repository repository;

    @GetMapping("/download")
    public void down() {

        RestTemplate rt = new RestTemplate();

        DownloadDto[] response = rt.getForObject(
                "http://pettravel.kr/api/listPart.do?page=1&pageBlock=133&partCode=PC01",
                DownloadDto[].class);

        List<DownloadDto> dto = Arrays.asList(response);

        List<Item> list = dto.get(0).getResultList();

        repository.saveAll(list);

    }

    @GetMapping("/loading")
    public List<Item> load() {

        List<Item> list = repository.findAll();
        PonitDto ponitDto = new PonitDto();

        // List<List<String>> points = ponitDto.toPoint(list);

        return list;
    }
}
