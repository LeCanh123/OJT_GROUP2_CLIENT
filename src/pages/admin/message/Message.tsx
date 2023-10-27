
export default function Message() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSearchPages, setTotalSearchPages] = useState(0);
  const [data, setData] = useState<MessageType[]>([]);

        setData(updatedData);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async (page: number, limit: number) => {
      try {
        const response = await adminApi.getMessage(page, limit);
        setData(response.data);
        setTotalPages(response.totalPage);
        setCurrentData(response.data);
        setCurrentPage(page);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, change]);


  let timeOut: string | number | NodeJS.Timeout | undefined;
  function searchKeyWords(searchValue: string) {
    clearTimeout(timeOut);
    timeOut = setTimeout(async () => {

          }
        })
        .catch((err: any) => {
          console.log("err", err);

      ),
    },
  ];

  return (

        <div className="col-md-5 mx-auto">
          <div className="input-group">
            <input
              className="form-control border-end-0 border rounded-pill"
              type="search"

              id="example-search-input"
              onChange={(event) => {
                const searchValue = event.target.value;
                if (searchValue.trim() !== "") {
                  searchKeyWords(searchValue);
                } else {
                  setSearchData([]);
                }
              }}
            />
            <span className="input-group-append">
              <button
                className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        expandable={{

    </div>
  );
}
